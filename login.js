let fs = require('fs');
let cd = require('chromedriver');
let swd = require('selenium-webdriver');

let bldr = new swd.Builder();
let driver = bldr.forBrowser('chrome').build();
//console.log('1');

let username,pwd,gci,gcrselement;

let cfile = process.argv[2];
let mfile = process.argv[3];
let cname = process.argv[4];

let credentialfilereadprom = fs.promises.readFile(cfile);
credentialfilereadprom.then(function(contents){
    let credentials = JSON.parse(contents);
    username = credentials.un;
    pwd = credentials.pwd;


let loginpageloadedpromise = driver.get("https://www.pepcoding.com/login");
    return loginpageloadedpromise;
  
}).then(function(){
    let usernameelefindprom = driver.findElement(swd.By.css("input[type=email]"));
    return usernameelefindprom;

}).then(function(unelement){
    let usernamewillenterprom = unelement.sendKeys(username);
    return usernamewillenterprom;

}).then(function(){
    let pwdelementwillfindprom = driver.findElement(swd.By.css("input[type=password]"));
    return pwdelementwillfindprom;

}).then(function(pwdelement){
    let pwdwillwriteprom = pwdelement.sendKeys(pwd);
    return pwdwillwriteprom;

}).then(function(){
    let btnwillfindprom = driver.findElement(swd.By.css("button[type=submit"));
    return btnwillfindprom;

}).then(function(btnelement){
    let btnwillclickedprom = btnelement.click();
    return btnwillclickedprom;
}).then(function(){
    //let waitforresourcelink = driver.wait(swd.until.elementLocated(swd.By.css('div.resource a')));
      let waitforresourcelink = driver.findElement(swd.By.css('div.resource a'));
     return waitforresourcelink; 

    }).then(function(rlinkelement){
    let willgethrefprom = rlinkelement.getAttribute('href');  ////important
    return willgethrefprom;

}).then(function(rlinkhref){
    let hreffoundprom = driver.get(rlinkhref);
    return hreffoundprom; 

}).then(function(){
    let siteovrlaypromele = driver.findElement(swd.By.css('div#siteOverlay'));
    return siteovrlaypromele;
}).then(function(soe){
    let soewaitprom = driver.wait(swd.until.elementIsNotVisible(soe));
    return soewaitprom;

}).then(function(){

    let courseprom = driver.findElements(swd.By.css('h2.courseInput'));
    return courseprom;
}).then(function(corseelem){
    gcrselement = corseelem;
    let promarr = [];
    for(let i=0; i < corseelem.length;i++){
        promarr.push(corseelem[i].getText());
    }
   // return promarr;
    // let courseenterprom = corseelem.click();
    // return courseenterprom;
    let combinepromoftexts = Promise.all(promarr);
    return combinepromoftexts;
}).then(function(texts){
    for(let i=0;i < texts.length;i++){
        if(cname === texts[i]){
            gci = i;
            break;
        }
    }
    let couseelemwillclickprom = gcrselement[gci].click();
    return couseelemwillclickprom;  

}).then(function(){
    let urlgetprom = driver.getCurrentUrl();
    return urlgetprom;
   // console.log('aa gye');
}).then(function(url){
    gcrl = url;
}).then(function(){
    let mfilewillbereadprom = fs.promises.readFile(mfile);
    return mfilewillbereadprom
    
    .then(function(content){
       // console.log(content);
       let meta = JSON.parse(content);
       //console.log(meta);

}).then(function(){



}).catch(function(err){
    console.log(err);
})

});
