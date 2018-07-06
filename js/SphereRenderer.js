/**
 * Created by ryosuke on 18/07/06.
 */


var sphereRendererDeffered = $.Deferred();

(function () {
    let sphereRadian = 500,
        container = document.getElementById('container'),
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100),
        scene = new THREE.Scene(),
        material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('img/sample.jpg')
        }),
        geometry = new THREE.SphereBufferGeometry(sphereRadian, 60, 40),
        mesh = new THREE.Mesh(geometry, material),
        renderer = new THREE.WebGLRenderer(),
        sphereRenderer = {
            updateRenderCameraPose: function (phi_deg, theta_deg) {

                // lat = Math.max(-85, Math.min(85, lat));
                // phi = THREE.Math.degToRad(90 - lat);
                // theta = THREE.Math.degToRad(lon);

                let phi = THREE.Math.degToRad(phi_deg),
                    theta = THREE.Math.degToRad(theta_deg);

                camera.target.x = sphereRadian * Math.sin(phi) * Math.cos(theta);
                camera.target.y = sphereRadian * Math.cos(phi);
                camera.target.z = sphereRadian * Math.sin(phi) * Math.sin(theta);

                camera.lookAt(camera.target);
                renderer.render(scene, camera);
            }
        };

    camera.target = new THREE.Vector3(0, 0, 0);
    geometry.scale(-1, 1, 1);
    scene.add(mesh);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 上の処理が非同期なので，ホントはresolveが呼ばれたタイミングで上の処理が全部終わっている保証はなく，
    // then先での1回めのupdateが期待通り機能する保証はない
    // やっちまったなぁというきもち
    sphereRendererDeffered.resolve(sphereRenderer);
})();


