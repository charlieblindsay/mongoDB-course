class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD QUERY

    // Creating a hard copy of the queryString object
    const queryObj = { ...this.queryString };

    // Ignoring fields used later
    const ignoredFields = ['sort', 'fields', 'limit', 'page'];
    ignoredFields.forEach((el) => delete queryObj[el]);

    // Respond to request like ?price[gte]=500
    let queryStr = JSON.stringify(queryObj); //
    // {"price":{"gte":"500"}} should be {"price":{"$gte":"500"}}

    // Regular expression which replaces any the 4 matches with $match:
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this; // Return the changed object
  }

  sort() {
    // SORTING
    // Sorting tours according to attribute values
    if (this.queryString.sort) {
      // Handles requests like ?sort=price,duration
      // So if tours have the same price they will be sorted by duration
      const sortBy = this.queuryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default: arrange tours with first being the last to be created
      this.query = this.query.sort('-price');
    }

    return this;
  }

  limitFields() {
    // FIELD LIMITING
    // Only shows specified fields
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Defailt: show all fields apart from __v
      this.query = this.query.select('-__v'); // Excluding __v field with - (minus)
    }

    return this;
  }

  paginate() {
    // PAGE LIMITS
    // Given a maximum number of tours per page (limit) and page number, return tours

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
