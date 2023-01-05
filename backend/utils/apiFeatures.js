class APIFeatures 
{
    constructor(query, queryStr)
    {
        this.query = query;
        this.queryStr = queryStr;
    }

    search()
    {
        let keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        } : {}

        this.query.find({...keyword})
        return this;
    }

    filter()
    {
        const queryStrCopy = {...this.queryStr};

        const removeFields = ['keyword',"limit","page"];
        removeFields.forEach(field => delete queryStrCopy[field]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));
        return this;
    }

    async paginate(resPerPage)
    {
        const totalCountQuery = this.query.clone();
        totalCountQuery.skip(0);
        const totalCount = await totalCountQuery.countDocuments();
        const totalPage = totalCount%resPerPage === 0 ? totalCount/resPerPage : Math.floor(totalCount/resPerPage)+1

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage-1);
        this.query.limit(resPerPage).skip(skip);
      
        const products = await this.query;
      
        return {
          products,
          totalPage
        };
    }
}

module.exports = APIFeatures;