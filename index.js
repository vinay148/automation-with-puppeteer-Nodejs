let ig = require('./instagram');

(async () => {

    await ig.initialize();
    await ig.login('crysis_065','insta@123');
    await ig.likeTagsProcess(['cars','carss']);

   
   // debugger;
   

})();