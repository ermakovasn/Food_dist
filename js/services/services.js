const postData = async (url, data) => {
    // во внутрь помещаем промисс, который возвращается от фетча
    // ставим await чтобы код дожидался ответа
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    // промисс возвращаем в формате json
    return await res.json();
};

const getResource = async (url) => {
    // во внутрь помещаем промисс, который возвращается от фетча
    // ставим await чтобы код дожидался ответа
    const res = await fetch(url);
    // обработка ошибок, тк метод fetch выводит ошибку только в случае отсутствия интернета
    if (!res.ok) {
        // выкидываем новую ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    // промисс возвращаем в формате json
    return await res.json();
};

export {postData};
export {getResource};