let headers = document.getElementsByTagName("h2");
let overview = document.getElementById("overview");

for (let i = 0; i < headers.length; ++i) {
    let element = document.createElement("li");
    let link = document.createElement("a");
    link.setAttribute("href", "#" + headers[i].id);
    link.innerHTML = headers[i].innerHTML;
    element.appendChild(link);
    overview.appendChild(element);
}