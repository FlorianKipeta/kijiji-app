export function checkNotificationStatus(message, user) {
    if(!("Notification" in window)) {
        alert("This browser does not support system notifications!")
    }
    else if(Notification.permission === "granted") {
        sendNotification(message, user)
    }
    else if(Notification.permission !== "denied") {
        Notification.requestPermission((permission)=> {
            if (permission === "granted") {
                sendNotification(message, user)
            }
        })
    }
}

function sendNotification(message, user) {
    const notification = new Notification("New message from "+user, {
        icon: "https://www.kijiji.co.tz/common/img/logo_black.svg",
        body: `${message}`
    })
}
