
const CLIENT_ID = '9072c87bd2a4b1188f3d'

chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
    switch (request.action) {
        case 'reddwarf_authorize':
            alert("reddwarf auth");
            let authorize_url = `https://api.poenhub.top/oauth2/authorize/?client_id=${CLIENT_ID}&response_type=token`
            window.open(authorize_url)
            sendReponse()
            break;
        default:
            break;
    }
    return true
})