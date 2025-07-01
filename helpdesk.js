var config = {
    host: 'ix01xmr4p1gnbkz.eu.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'AfVzQT9hoKjtZ9CnoUcO0Pz8BQAcU42b'
};

//Redirect to login if user is not logged in
/*async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+
            "/login?qlik-web-integration-id=" + config.webIntegrationId +
            "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
} */
async function login() {
    async function isLoggedIn() {
        const res = await fetch("https://" + config.host + "/api/v1/users/me", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'qlik-web-integration-id': config.webIntegrationId
            }
        });

        if (res.status !== 200) {
            // Redirect to Qlik login page
            window.location.href = "https://" + config.host + "/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error("User not authenticated.");
        }
        return true;
    }

    return isLoggedIn();
}
login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host +
        (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
        //open apps -- inserted here --
        var app = qlik.openApp( '32a7a21a-8b99-4af8-9411-bab71d116d88', config );

        //get objects -- inserted here --
        app.visualization.get('b10b249e-2ff8-447d-9e44-fca5a9d8580b').then(function(vis){
        vis.show("QV01");
        } );
        app.visualization.get('<OBJECT_ID>').then(function(vis){
        vis.show("QV02");
        } );
        app.visualization.get('<OBJECT_ID>').then(function(vis){
        vis.show("QV03");
        } );
        app.visualization.get('<OBJECT_ID>').then(function(vis){
        vis.show("QV04");
        } );
        app.visualization.get('<OBJECT_ID>').then(function(vis){
        vis.show("QV05");
        } );
        app.visualization.get('<OBJECT_ID>').then(function(vis){
        vis.show("QV06");
        } );
    } );
});
