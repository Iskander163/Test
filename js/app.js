async function getData(){
    const response =await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
}

async function main() {
    const postsData = await getData();
    let currentPage = 1;
    let rows = 10;


    function displayList(arrData, rowPerPage, page) {
        const postsEl= document.querySelector('.posts');
        postsEl.innerHTML = "";
        page--;

        const start = rowPerPage * page ;
        const end = start + rowPerPage ;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) =>{
            const postEl = document.createElement("div");
            postEl.classList.add("post");
            postEl.innerText = `${el.title}`;
            postsEl.appendChild(postEl); 
        })
    };
    function displayPagination(arrData, rowPerPage) {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');

        for(let i = 0; i< pagesCount; i++) {
            const liEL = dispalyPaginationBtn(i+1);
            ulEl.appendChild(liEL)
        }
        paginationEl.appendChild(ulEl)
    };
    function dispalyPaginationBtn(page) {
        const liEL = document.createElement("li");
        liEL.classList.add('pagination__item')
        liEL.innerText = page

        if (currentPage == page) liEL.classList.add('pagination__item--active');

        liEL.addEventListener('click',()=>{
            currentPage = page
            displayList(postsData, rows, currentPage)

            let currentItemLi = document.querySelector('li.pagination__item--active')
            currentItemLi.classList.remove('pagination__item--active')

            liEL.classList.add('pagination__item--active')
        })
        return liEL;
    };

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows)
}

main();