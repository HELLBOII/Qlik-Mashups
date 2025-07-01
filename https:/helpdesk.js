var config = {
    host: 'ix01xmr4p1gnbkz.eu.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'AfVzQT9hoKjtZ9CnoUcO0Pz8BQAcU42b'
};

//Redirect to login if user is not logged in
async function login() {
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
        var app = qlik.openApp( '<APP_ID>', config );

        //get objects -- inserted here --
        app.visualization.get('<OBJECT_ID>').then(function(vis){
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
