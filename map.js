const mapCanvas = document.getElementById('map');
            const mapCtx = mapCanvas.getContext('2d');

            mapCanvas.width = mapCanvas.height = window.innerWidth*0.8;

            let player;
            let projects=[];
            let dunes;
            let view ;
            let mapIsLarge =  false;

            function updatePlayerPos(x,y,vx,vy){
                player={x,y};
                view ={vx,vy};
               
                mapCtx.clearRect(0,0,mapCanvas.width,mapCanvas.height)
                mapCtx.fillStyle = 'rgba(255, 255, 255, 0.647)';
                mapCtx.fillRect(0,0,mapCanvas.width,mapCanvas.height)

                mapCtx.beginPath();
                mapCtx.arc(player.x*mapCanvas.width,player.y*mapCanvas.height,30,0,Math.PI*2);
                mapCtx.fillStyle='black';
                mapCtx.lineWidth=3;
                mapCtx.stroke();

                mapCtx.beginPath();
                mapCtx.moveTo(player.x*mapCanvas.width,player.y*mapCanvas.height);
                mapCtx.lineTo(view.vx*mapCanvas.width,view.vy*mapCanvas.height);
                mapCtx.stroke()
                
                projects.forEach((p)=>{
                    drawProjects(p,dunes)
                    
                    if(mapIsLarge){
                        drawProjectNames(p,dunes)
                    }
                    
                })

            }

            function drawProjects(project,dunes){
                mapCtx.fillStyle='black';
                //console.log(project)
                mapCtx.fillRect((Math.abs((project.x/dunes.width)-1)*mapCanvas.width)-10,(project.z/-dunes.lenght*mapCanvas.height)-10,20,20);
                
            }

            function drawProjectNames(project,dunes){
                mapCtx.font='30px Arial'
                mapCtx.fillText(project.name,(Math.abs((project.x/dunes.width)-1)*mapCanvas.width)+20,(project.z/-dunes.lenght*mapCanvas.height)+10)
            }
            

           

            document.getElementById('map').addEventListener('mouseover',(()=>{
                
                mapIsLarge=true;
                console.log(mapIsLarge)
            }))
            document.getElementById('map').addEventListener('mouseout',(()=>{
                
                mapIsLarge=false;
                console.log(mapIsLarge)
            }))