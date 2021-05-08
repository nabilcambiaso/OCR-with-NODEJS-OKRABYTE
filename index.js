const fs = require("fs");
const okrabyte = require("okrabyte");

(async () => {

    async function getText() {

        const files = await new Promise((resolve, reject) => {
            fs.readdir('images/', (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        })


        const mapp = await Promise.all(files.map((file) => {
            return new Promise((resolve, reject) => {
                okrabyte.decodeBuffer(fs.readFileSync("images/" + file), (err, data) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        }))

        return mapp;

    }
 
    const textData=await getText();

    console.log(textData);

})().catch((err) => { console.log(err) })