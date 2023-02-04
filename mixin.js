export const mixin = {
    methods: {
        httpget() {
            let httpimg = new XMLHttpRequest();
            console.log(httpimg)
            httpimg.open('GET', `https://service-o15lm07j-1300177834.cd.apigw.tencentcs.com/release/cloudsearch?keywords=你好}`, true);
            httpimg.setRequestHeader("Content-type", "application/json");
            httpimg.send();
            httpimg.onreadystatechange = () => {
                if (httpimg.readyState === 4 && httpimg.status === 200) {
                    console.log(httpimg.responseText)
                    return JSON.parse(httpimg.responseText);
                }
            }
        }
    },
}
