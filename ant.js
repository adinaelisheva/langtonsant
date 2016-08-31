window.onload = function(){
  var grid, gs, ctx, stepMS;
  var ant = {x:0,y:0,dir:0};

  dir = {
      N: 0,
      E: 1,
      S: 2,
      W: 3
  }

  rotateAnt = function(amt) {
      ant.dir = (ant.dir + amt) % 4;
      if(ant.dir < 0) { ant.dir += 4; }
  }

  moveAnt = function(dist) {
      switch(ant.dir){
          case dir.N:
              ant.y -= dist;
              break;
          case dir.S:
              ant.y += dist;
              break;
          case dir.E:
              ant.x += dist;
              break;
          case dir.W:
              ant.x -= dist;
              break;
      }

      //torus
      if(ant.x < 0) { ant.x = gs-1; }
      if(ant.y < 0) { ant.y = gs-1; }
      if(ant.x >= gs) { ant.x = 0; }
      if(ant.y >= gs) { ant.y = 0; }
  }

  var setup = function() {
      grid = [];
      for(i = 0; i < gs; i++){
          var row = [];
          for(j = 0; j < gs;j++){
              row.push(false);
          }
          grid.push(row);
      }
  };

  var drawGridCell = function(i,j,drawLines) {
      ctx.fillStyle = grid[i][j] ? "#ffffff" : "#000000";
      var x1 = i*cs;
      var y1 = j*cs;
      ctx.fillRect(x1,y1,cs,cs);
      if(drawLines){
          ctx.strokeRect(x1,y1,cs,cs);
      }
  }

  var drawGrid = function() {
      ctx.clearRect(0,0,1000,1000);
      ctx.strokeStyle = "#dddddd";

      for(i = 0; i < grid.length; i++){
          for(j = 0; j < grid[0].length; j++){
              drawGridCell(i,j);
          }
      }

      drawAnt();
  };

  var updateCells = function(oldX,oldY,newX,newY) {
      drawGridCell(oldX, oldY);
      drawGridCell(newX, newY);
      drawAnt();
  }

  var drawAnt = function() {
      ctx.fillStyle = "#ff0000";
      offset = Math.round(cs/5);
      var x1 = ant.x*cs + offset;
      var y1 = ant.y*cs + offset;
      var w = cs - offset*2;

      ctx.fillRect(x1,y1,w,w);

      ctx.fillStyle = "#888888";
      var h = Math.floor(w/3);
      switch(ant.dir){
          case dir.N:
              ctx.fillRect(x1+2,y1,w-4,h);
              break;
          case dir.S:
              ctx.fillRect(x1+2,y1+w-h,w-4,h);
              break;
          case dir.E:
              ctx.fillRect(x1+w-h,y1+2,h,w-4);
              break;
          case dir.W:
              ctx.fillRect(x1,y1+2,h,w-4);
              break;
      }
    
  }

  gs = 80; //grid size (in cells)
  cs = 6; //cell size
  ctx = $("#grid")[0].getContext('2d');
  stepMS = 10;
  ant.x = Math.round(gs/2);
  ant.y = Math.round(gs/2);

  setup();
  drawGrid();

  var mode = 1;
  var count = 0;
  var update = function() {
      if(grid[ant.x][ant.y]) {
          rotateAnt(1);
      } else {
          rotateAnt(-1);
      }
      var x = ant.x;
      var y = ant.y;
      grid[x][y] = !grid[x][y]
      moveAnt(1);    
      updateCells(x,y,ant.x,ant.y);
  }
  var x = window.setInterval(update,0);
};