
//import { Auth,Validate } from "js-wheel";

chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
    debugger;
    switch (request.action) {
        
        case 'reddwarf_authorize':
            alert("reddwarf auth");
            let authorize_url = `https://api.poenhub.top/oauth2/authorize/?response_type=token`
            //Auth.handleAccessTokenExpire();
            //Validate.mobileCheck('2222');
            sendReponse()
            break;
        default:
            break;
    }
    return true
})