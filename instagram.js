let puppeteer = require('puppeteer');
let BASE_URL = "https://www.instagram.com/";
let TAg_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;


let instagram = {
    browser: null,
    page: null,

    initialize: async () => {

        instagram.browser =  await puppeteer.launch( {"headless": false, args: ['--start-maximized'] } ); 
    

        //});

        instagram.page = await instagram.browser.newPage();
        //await page.setDefaultNavigationTimeout(0);

        //await instagram.page.goto(BASE_URL, { waituntil: 'networkidle2'});
    },

    login: async (username, password) => {
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
        // await instagram.page.$x
        // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});
        await instagram.page.setDefaultNavigationTimeout(0);
        
        await instagram.page.type('input[name="username"]', username, { delay: 50 });
        
        await instagram.page.type('input[name="password"]', password, { delay: 50 });
        
        await instagram.page.click('button[type="submit"]');
        //await instagram.page.click('button.sqdOP yWX7d y3zKF');

        await instagram.page.waitFor(10000);




    },

    likeTagsProcess: async (tags = []) => {

        for (let tag of tags) {
            await instagram.page.goto(TAg_URL(tag), { waitUntil: 'networkidle2' });

            await instagram.page.waitFor(3000);

            // debugger;
            
            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');
            //array of posts 

            for (let i = 0; i < 3; i++) {
                // await posts[i].click();
                let post = posts[i];
                await post.click();

                // await instagram.page.waitFor('body[style="overflow: hidden;"]');
                await instagram.page.waitFor(5000);
                //if()
                // let islikeble =  await instagram.page('svg[area-label="like"]');

               
                try {
                    await instagram.page.click('svg[aria-label="Like"]');
                }
                catch (err) {
                    // Already like
                   // search = false;
                }
               
               
                await instagram.page.waitFor(5000);
                
                await instagram.page.click('svg[aria-label="Close"]');
                //  let closebtn = await instagram.page.$x('//button[contains(text(), "Close")]');
                //  await closebtn[0].click();
                await instagram.page.waitFor(1000);
            }
            await instagram.page.waitFor(15000);
        }

        await instagram.browser.close();
    }
}

module.exports = instagram;






