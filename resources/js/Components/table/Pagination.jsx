import React, { useMemo } from 'react'

export const Pagination = ({
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageIndex,
    pageOptions,
    page,
    pageSize
}) => {

    const links = useMemo(() => paginationLinks(pageOptions.length - 1, pageIndex), [pageOptions, pageIndex])

    return (
        <div className="px-4 bg-gray-50 bg-opacity-40 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 overflow-hidden">
            <div className="flex-1 flex justify-between sm:hidden">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        {
                            page.length ?
                                <>
                                    Showing
                                    <span className="font-medium px-1">{(pageSize * pageIndex) + 1}</span>
                                    to
                                    <span className="font-medium px-1">{(pageSize * pageIndex) + page.length}</span>
                                </>
                                : ''
                        }
                    </p>
                </div>
                <div>
                    {
                        pageOptions.length > 1 &&
                        <nav className="relative bg-white z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {
                                <button disabled={!canPreviousPage} onClick={() => previousPage()} className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none ${canPreviousPage ? 'text-gray-600' : 'text-gray-300'}`}>
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            }
                            {
                                links.map((page, index) => (

                                    typeof page === 'number' ?

                                        <button disabled={pageIndex === page} key={index} onClick={() => gotoPage(page)} className={`relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm hover:bg-slate-700 hover:text-slate-100 focus:outline-none ${pageIndex === page ? 'text-slate-100 font-bold bg-slate-700' : 'text-gray-600 font-medium'}`}>
                                            {page + 1}
                                        </button>

                                        :
                                        <span className="relative inline-flex items-center px-3 py-1 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50" key={index}>{page}</span>
                                ))
                            }
                            {
                                <button disabled={!canNextPage} onClick={() => nextPage()} className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-100 focus:outline-none ${canNextPage ? 'text-gray-600' : 'text-gray-300'}`}>
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            }
                        </nav>

                    }
                </div>
            </div>
        </div>
    )
}


function paginationLinks(lastIndex, currentIndex) {
    const maxLinks = 5;
    let leftIndexs = 2;
    let rightIndexs = 2;
    let range = [];

    if (lastIndex <= maxLinks) {

        for (let index = 0; index <= lastIndex; index++) {
            range.push(index);
        }

        return range;
    }

    let unUsedLeftIndexs = leftIndexs - currentIndex;
    if (unUsedLeftIndexs > 0) {
        rightIndexs += unUsedLeftIndexs;
        leftIndexs += leftIndexs - unUsedLeftIndexs;
    }


    let unUsedRighIndexs = (rightIndexs + currentIndex) - lastIndex;
    if (unUsedRighIndexs > 0) {
        leftIndexs += unUsedRighIndexs;
        rightIndexs += rightIndexs - unUsedRighIndexs;
    }

    range.push(currentIndex)

    range.push(0);

    for (let index = 1; index < rightIndexs; index++) {
        if (currentIndex + index < lastIndex) {
            range.push(currentIndex + index);
        }
    }

    for (let index = 1; index < leftIndexs; index++) {
        if (currentIndex - index > 0) {
            range.push(currentIndex - index);
        }
    }

    range.push(lastIndex);

    // remove duplicates and sort numbers
    range = Array.from(new Set(range)).sort((a, b) => a - b);

    for (let index = 0; index < range.length - 1; index++) {


        if (typeof range[index] !== 'number') {
            continue
        }

        range[index] + 1 !== range[index + 1] && range.splice(index + 1, 0, '...');

        if (index > 10) {
            break;
        }


    }

    return range;
}
