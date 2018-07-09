/**
 * Created by ryosuke on 18/06/17.
 */


// https://miku.ricoh/blog_ja/2017/09/26/sampleimage.html

// https://ics-creative.github.io/141216_sp_device/deviceorientation/
// https://developer.mozilla.org/ja/docs/Web/API/Detecting_device_orientation
// https://developers.google.com/web/fundamentals/native-hardware/device-orientation/?hl=ja

$.when(sphereRendererDeffered).then(function (sphereRenderer) {
    const deviceOrientationHandler = function (event) {
        const pitch = event.beta;
        const yaw = event.gamma;
        const roll = event.alpha;

        console.log(pitch + ', ' + yaw + ', ' + roll);
        sphereRenderer.updateRenderCameraPose(-pitch, -yaw)
    };

    window.addEventListener('deviceorientation', deviceOrientationHandler);

    // let pitch = 0;
    // function updateTest() {
    //     sphereRenderer.updateRenderCameraPose(pitch, 0);
    //     requestAnimationFrame(updateTest);
    // }
    // updateTest();

});


