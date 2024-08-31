// Import Three.js
import * as THREE from 'three';

import { TextureLoader } from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// Step 2: Set up the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('Canvas3D'),
    alpha: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//scene.background = new THREE.Color('rgba(0,0,0,0)');
scene.background=null;
//const controls = new OrbitControls( camera, renderer.domElement );

scene.fog = new THREE.Fog( new THREE.Color('rgba(255,255,255,0)'), 1, 150 );

const ambientLight = new THREE.AmbientLight(new THREE.Color('white'),1); // soft white light
scene.add(ambientLight);

const lightTarget = new THREE.Object3D();
lightTarget.position.set(200,0,-200);

const dirlight = new THREE.DirectionalLight(new THREE.Color('white'),2); // soft white light

dirlight.position.set(100,100,0);
dirlight.target=lightTarget;
scene.add( dirlight.target );

dirlight.castShadow = true; // default false
scene.add( dirlight );

//Set up shadow properties for the light
dirlight.shadow.mapSize.width = 1000; // default
dirlight.shadow.mapSize.height = 1000; // default
dirlight.shadow.camera.near = 0.5; // default
dirlight.shadow.camera.far = 1000; // default


dunes={width:400,lenght:400}

let triangles=[];

noise.seed(Math.random());

function getNoise(x,y){
    return (noise.simplex2(x/100 , y/100 )*noise.simplex2(x/100 , y/100 )*10)+(noise.perlin2(x/1000 , y/1000 )*100)
}

function createSquare(x,y){
    triangles.push(
        (x-1),getNoise(x-1,y-1),-(y-1),
        (x-1),getNoise(x-1,y+1),-(y+1),
        (x+1),getNoise(x+1,y+1),-(y+1),

        (x+1),getNoise(x+1,y+1),-(y+1),
        (x+1),getNoise(x+1,y-1),-(y-1),
        (x-1),getNoise(x-1,y-1),-(y-1),
        
    )
}

for(let x=0;x<dunes.width;x+=2){
    for(let y=0;y<dunes.lenght;y+=2){
        createSquare(x,y)
    }
}

let trianglesArray = new Float32Array(triangles);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.BufferAttribute( trianglesArray, 3 ) );
geometry.computeVertexNormals()

const material = new THREE.MeshPhysicalMaterial({
    color : new THREE.Color('black'),
    side: THREE.DoubleSide,
    wireframe:true,
    fog:true,
    roughness: 1,


});
const material2 = new THREE.MeshPhysicalMaterial({
    roughness: 1,
    color:new THREE.Color('hsl(20,0%,60%)'),
    side: THREE.BackSide,
    fog:true
    })

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.y=-1;

mesh2.receiveShadow = true;
mesh2.castShadow = true;
scene.add(mesh,mesh2);

let raycaster = new THREE.Raycaster();

camera.position.set(dunes.width/2,0,-dunes.lenght/2)  // Move the camera further away from the object
let rayOrigin = camera.position.clone();
rayOrigin.y += 100;  // Raise the ray origin a bit above the camera
raycaster.set(rayOrigin, new THREE.Vector3(0, -1, 0)); // Ray pointing straight down

let intersects = raycaster.intersectObject(mesh);

    
if (intersects.length > 0) {
        let intersection = intersects[0];
        // Update camera's y position to match the plane's y value at this position
        camera.position.y = intersection.point.y + 2; // Optional offset if needed
}

class Project{
    constructor(name,link,texturePath,description,model){
        this.model=model;
        this.name = name;
        this.description=description
        this.link=link;
        this.geometry=new THREE.BoxGeometry( 10,10, 1 );
        this.material=new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const text_texture = new THREE.TextureLoader().load(texturePath ); 
        text_texture.magFilter = THREE.NearestFilter;
        text_texture.generateMipmaps = false;
        this.material = [
            new THREE.MeshBasicMaterial({
                color:new THREE.Color('black')
            }),
            new THREE.MeshBasicMaterial({
                color:new THREE.Color('black')
            }),
            new THREE.MeshBasicMaterial({
                color:new THREE.Color('black')
            }),
            new THREE.MeshBasicMaterial({
                color:new THREE.Color('black')
            }),
            new THREE.MeshBasicMaterial({
                map: text_texture
            }),
            new THREE.MeshBasicMaterial({
                map: text_texture
            }),
        ]
        
        this.x = (Math.random()*0.8*dunes.width)+(0.1*dunes.width);
        this.z = -((Math.random()*0.8*dunes.lenght)+(0.1*dunes.lenght));
        this.y=0;
        let raycaster = new THREE.Raycaster();
        raycaster.set(new THREE.Vector3(this.x,100,this.z),new THREE.Vector3(0, -1, 0));
        let intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
            let intersection = intersects[0];
        // Update camera's y position to match the plane's y value at this position
        this.y = intersection.point.y + 3; // Optional offset if needed
        
        this.mesh = new THREE.Mesh(this.geometry,this.material);
        this.mesh.position.set(this.x,this.y,this.z);
        scene.add(this.mesh)
        project_meshes.push(this.mesh)
        
       
        
        

        /*loader.load(
            this.model, 
        (gltf)=> {
            console.log(gltf.scene.children[0])
            this.mesh=gltf.scene.children[0];
            this.mesh.position.set(this.x,this.y,this.z);
        
            scene.add(this.mesh);
            project_meshes.push(this.mesh)
            
            
        },
        
        );*/
        
        
       
    }


    }
}

let project_meshes=[];
let names = ["Graphic Dialect","Particle System X Mediapie"]
let links = ["https://aeffront.github.io/GRAPHIC-DIALECT/","https://aeffront.github.io/particle_system/"]
let textures = ['Projects/graphic_dialect.png','Projects/particle_system_X_mediapipe.png']
let descriptions = ["A javascript based  script that generates visual compositions. This script uses as base, the creation of paths, simulating written letters that are afterwards organised in rows ,lines and blocks.","A javascript based  script that utilizes Mediapipe's hand-pose machine learning recognition model to give the user contrôle over a particle system."]
let models = ['Projects/models/2.glb','Projects/models/2.glb']

for (let i=0;i<2;i++){
    let name = names[i];
    let link = links[i]
    let texture = textures[i];
    let description = descriptions[i]
    let model = models[i];
    let myCube = new Project(name,link,texture,description,model)

    projects.push(myCube);
    //console.log(myCube.mesh)
    
    console.log(project_meshes)
}

const Praycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

   // Handle mouse movement
function onPointerMove(event) {
    // Normalize pointer coordinates to (-1, 1)
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    Praycaster.setFromCamera(pointer, camera);
    
    // Calculate objects intersecting the ray
    const intersects = Praycaster.intersectObjects(project_meshes);
    document.body.style.cursor="url('cursor.png'),auto"
    
    document.getElementById("project_description").style.display='none'
    console.log(intersects)
    if (intersects.length > 0) {
        document.body.style.cursor='pointer'
        document.getElementById("project_description").style.display='block'
        
        
        
        
        // If the cube is clicked, change its color
       
        console.log(intersects[0]);
        let obj = intersects[0];
        let id = obj.object.uuid;
        console.log(id)
        let index = project_meshes.findIndex(mesh => mesh.uuid === id)
        console.log(projects[index].name);
        document.getElementById("project_name").innerHTML= projects[index].name;
        document.getElementById("project_description_text").innerHTML=projects[index].description;

       
       
    }
}
window.addEventListener('pointermove', onPointerMove);

function onPointerClick() {
    // Update the raycaster with the camera and pointer position
    Praycaster.setFromCamera(pointer, camera);
    
    // Calculate objects intersecting the ray
    const intersects = Praycaster.intersectObjects(project_meshes);
    document.body.style.cursor='auto'
    if (intersects.length > 0) {
        document.body.style.cursor='pointer'
        // If the cube is clicked, change its color
       
        console.log(intersects[0]);
        let obj = intersects[0];
        let id = obj.object.uuid;
        console.log(id)
        let index = project_meshes.findIndex(mesh => mesh.uuid === id)
        console.log(index);
        window.open(projects[index].link);
    }
}
window.addEventListener('click', onPointerClick);


const OBJloader = new OBJLoader();

let myRock = null; // Initialize to null or undefined
let myTree = null; // Initialize to null or undefined


OBJloader.load(
    // resource URL
    'rocks/tree.obj',
    // called when resource is loaded
    function (object) {
        myTree = object.clone(); // Store the loaded object
        console.log('Model loaded:', myTree);

        for (let i = 0; i < 20; i++) {
            let tempTree = myTree.clone(); // Clone after ensuring it's loaded
            let objPos = new THREE.Vector3(dunes.width*Math.random(), 100, -dunes.lenght*Math.random());
            let objRay = new THREE.Raycaster();
            objRay.set(objPos, new THREE.Vector3(0, -1, 0)); // Ray pointing straight down

            let intersects = objRay.intersectObject(mesh2);

            if (intersects.length > 0) {
                let intersection = intersects[0];
                // Update tempRock's y position to match the plane's y value at this position
                objPos.y = intersection.point.y +1; // Optional offset if needed
                tempTree.traverse(function(child) {
                    if (child instanceof THREE.Mesh){
                        child.material = material2;
                    }
                }); // Set material if needed
                tempTree.position.set(objPos.x, objPos.y, objPos.z);
                
                tempTree.castShadow=true;
                tempTree.rotateY(Math.random()*10)
                
                scene.add(tempTree); // Add the cloned object to the scene
            }
        }
    },
    // called when loading is in progress
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

OBJloader.load(
    // resource URL
    'rocks/1.obj',
    // called when resource is loaded
    function (object) {
        myRock = object.clone(); // Store the loaded object
        console.log('Model loaded:', myRock);

        for (let i = 0; i < 100; i++) {
            let tempRock = myRock.clone(); // Clone after ensuring it's loaded
            let objPos = new THREE.Vector3(dunes.width*Math.random(), 100, -dunes.lenght*Math.random());
            let objRay = new THREE.Raycaster();
            objRay.set(objPos, new THREE.Vector3(0, -1, 0)); // Ray pointing straight down

            let intersects = objRay.intersectObject(mesh2);

            if (intersects.length > 0) {
                let intersection = intersects[0];
                // Update tempRock's y position to match the plane's y value at this position
                objPos.y = intersection.point.y + 2; // Optional offset if needed
                tempRock.traverse(function(child) {
                    if (child instanceof THREE.Mesh){
                        child.material = material2;
                    }
                }); // Set material if needed
                tempRock.position.set(objPos.x, objPos.y, objPos.z);
                let scale = Math.random();
                
                tempRock.rotateY(Math.random()*10)
                
                scene.add(tempRock); // Add the cloned object to the scene
            }
        }
    },
    // called when loading is in progress
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);



/*OBJloader.load(
    // resource URL
    'Sculptures/1.obj',
    // called when resource is loaded
    function (object) {
         let sculpture = object.clone(); // Store the loaded object


        
            
            let objPos = new THREE.Vector3(dunes.width*0.5, 100, -dunes.lenght*0.5);
            let objRay = new THREE.Raycaster();
            objRay.set(objPos, new THREE.Vector3(0, -1, 0)); // Ray pointing straight down

            let intersects = objRay.intersectObject(mesh2);

            if (intersects.length > 0) {
                let intersection = intersects[0];
                // Update tempRock's y position to match the plane's y value at this position
                objPos.y = intersection.point.y +1; // Optional offset if needed
                sculpture.traverse(function(child) {
                    if (child instanceof THREE.Mesh){
                        child.material = new THREE.MeshPhysicalMaterial({
                            roughness:0,
                            color:'green',
                            
                            emition:1
                        });
                    }
                }); // Set material if needed
                sculpture.position.set(objPos.x, objPos.y, objPos.z);
                
                sculpture.castShadow=true;
                sculpture.rotateY(0.5)
                
                scene.add(sculpture); // Add the cloned object to the scene
            }
        
    },
    // called when loading is in progress
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);*/

// The console.log here won't show the loaded rock as it happens before the loading completes


let front;
let back;
let left;
let right;
let up;
let down;

let camDir = new THREE.Vector3();
let camPos = new THREE.Vector3();
let testVect = new THREE.Vector3()



// Render the scene
function animate() {
    
    // Get the current position and direction of the camera
    camera.getWorldPosition(camPos);
    camera.getWorldDirection(camDir);
    updatePlayerPos(Math.abs((camPos.x/dunes.width)-1),camPos.z/-dunes.lenght);
    //console.log(camPos)
    camera.getWorldPosition(testVect);

    let Camview = testVect.add(camDir.clone().multiplyScalar(25));
   
    let myview = {x:Math.abs(((Camview.x)/dunes.width)-1),y:Camview.z/-dunes.lenght }
    
    updatePlayerPos(Math.abs((camPos.x/dunes.width)-1),camPos.z/-dunes.lenght,myview.x,myview.y);
    

    if (front) {
        testVect.add(camDir.clone().multiplyScalar(1));
        // Move the camera forward in the direction it's facing
        if(testVect.x>dunes.width*0.1 && testVect.x<dunes.width*0.9 && testVect.z<-dunes.width*0.1 && testVect.z>-dunes.lenght*0.9){
            camera.position.add(camDir.clone().multiplyScalar(1));
        }
         // Adjust the multiplier to control speed
    } else if (back) {
        testVect.add(camDir.clone().multiplyScalar(-1));
        if(testVect.x>dunes.width*0.1 && testVect.x<dunes.width*0.9 && testVect.z<-dunes.width*0.1 && testVect.z>-dunes.lenght*0.9){
            camera.position.add(camDir.clone().multiplyScalar(-1));
        }
    }

    if (left) {
        // Rotate the camera to the left and update the direction vector
        camera.rotateY(0.1);
    } else if (right) {
        // Rotate the camera to the right and update the direction vector
        camera.rotateY(-0.1);
    }
    if (up) {
        // Rotate the camera to the left and update the direction vector
        camera.rotateX(0.1);
    } else if (down) {
        // Rotate the camera to the right and update the direction vector
        camera.rotateX(-0.1);
    }
// Raycast to find the intersection point with the plane
    // Set the ray's origin slightly above the camera to avoid missing the plane due to floating-point errors
    let rayOrigin = camera.position.clone();
    rayOrigin.y += 10;  // Raise the ray origin a bit above the camera
    raycaster.set(rayOrigin, new THREE.Vector3(0, -1, 0)); // Ray pointing straight down

    let intersects = raycaster.intersectObject(mesh);

    if (intersects.length > 0) {
        let intersection = intersects[0];
        // Update camera's y position to match the plane's y value at this position
        camera.position.y = intersection.point.y + 2; // Optional offset if needed
    }


    // Continue rendering
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);
    
}
animate();

document.addEventListener('keydown',((e)=>{
    
    document.getElementById('map').style.display='block';
    document.getElementById('menu').style.display='flex';
    document.getElementById('intro').style.display='none';
    document.getElementById('Canvas3D').style.filter='none';
    if(e.code=='ArrowDown'){
        front=false;
        back=true;

    }
    else if(e.code=='ArrowUp'){
        front=true;
        back=false;

    }
    else if(e.code=='ArrowLeft'){
        left=true;
        right=false;

    }
    else if(e.code=='ArrowRight'){
        left=false;
        right=true;

    }
    else if(e.code=='KeyW'){
        
        up=true;
        down=false;

    }
    else if(e.code=='KeyS'){
        up=false;
        down=true;

    }
    document.addEventListener('keyup',(e)=>{
        if(e.code=='ArrowUp'||e.code=='ArrowDown'){
            front=false;
            back=false;
        }
        else if(e.code=='ArrowLeft'||e.code=='ArrowRight'){
            left=false;
            right=false;
        }
        else if(e.code=='KeyW'||e.code=='KeyS'){
            up=false;
            down=false;
        }
    })

}))

document.addEventListener('touchstart',((e)=>{
    
    document.getElementById('map').style.display='block';
    document.getElementById('menu').style.display='flex';
    document.getElementById('intro').style.display='none';
    document.getElementById('Canvas3D').style.filter='none';
    if(e.clientX<window.height/2){
        front=false;
        back=true;

    }
    else if(e.clientX>window.height/2){
        front=true;
        back=false;

    }
    else if(e.code=='ArrowLeft'){
        left=true;
        right=false;

    }
    else if(e.code=='ArrowRight'){
        left=false;
        right=true;

    }
    else if(e.code=='KeyW'){
        
        up=true;
        down=false;

    }
    else if(e.code=='KeyS'){
        up=false;
        down=true;

    }
    document.addEventListener('keyup',(e)=>{
        if(e.code=='ArrowUp'||e.code=='ArrowDown'){
            front=false;
            back=false;
        }
        else if(e.code=='ArrowLeft'||e.code=='ArrowRight'){
            left=false;
            right=false;
        }
        else if(e.code=='KeyW'||e.code=='KeyS'){
            up=false;
            down=false;
        }
    })

}))
