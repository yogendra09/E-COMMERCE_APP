


exports.getPagination = (page_tmp, size) => {
    const limit = size ? +size : 0;
    const page = page_tmp - 1;
    const offset = page ? (page ) * limit : 0;
    return { limit, offset };
};

exports.getPagingData = (rows, totalItems, page, limit) => {

    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, rows, totalPages, currentPage };
};