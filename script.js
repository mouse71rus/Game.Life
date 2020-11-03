var Life = {};

Life.nRow = 30;
Life.nCol = 45;
Life.emptyCell = "";
Life.lifeCell = "#f00";
Life.nTick = 1000;
Life.putM = function()
{
    var str = "<TABLE id='mLife' cellspacing=0 cellpadding=0>";

    for (var i = 0; i < Life.nRow; i++)
    {
        str += "<TR>";
        for (var j = 0; j < Life.nCol; j++)
        {
            str += "<TD onclick='Life.click(" + i + "," + j + ")' id='" + Life.getId(i, j) + "'>&nbsp;</TD>";
        }
        str += "</TR>";
    }

    str += "</TABLE>";

    document.write(str);
};

Life.list1 = {};

Life.list2 = {};

Life.CellStatus = function(row, col, status)
{
    var st = document.getElementById(Life.getId(row, col)).style;
    if (arguments.length > 2) 
        st.backgroundColor = status;

    return st.backgroundColor;
};

Life.changeCellStatus = function(row, col)
{
    var id = Life.getId(row, col);
    var st = document.getElementById(id).style;

    if (st.backgroundColor)
    {
        st.backgroundColor = Life.emptyCell;
        delete Life.list1[id];
    } 
    else
    {
        st.backgroundColor = Life.lifeCell;
        Life.list1[id] = 100; 
    }
};

Life.start = true; 
Life.timer;
Life.time;
Life.startStop = function()
{
    Life.start = !Life.start;

    document.getElementById("start").value = Life.start ? "Старт" : "Стоп";

    if (Life.start) 
    {
        clearInterval(Life.timer); 
    }
    else 
    {
        Life.time = 0;
        Life.timer = setInterval(Life.generation, Life.nTick);
    }
};

Life.generation = function()
{
    for (var cell in Life.list1) 
    {
        Life.list2[cell] = Life.list1[cell];
    }

    for (var cell in Life.list1)
    {
        var list = Life.listNear(cell);
        for (var k in list)
        {
            Life.list2[k] = Life.list2[k] ? (Life.list2[k] + 1) : 1;
        }

        delete Life.list1[cell];
    }

    
    for (var cell in Life.list2)
    {
        
        Life.list2[cell] = (Life.list2[cell] == 3 || Life.list2[cell] == 102 || Life.list2[cell] == 103) ? 100 : 0;

        
        var ob = Life.getRowCol(cell); 

        if (Life.list2[cell] == 100)
        {
            Life.list1[cell] = 100;

            Life.CellStatus(ob.row, ob.col, Life.lifeCell);
        } 
        else 
        {
            Life.CellStatus(ob.row, ob.col, Life.emptyCell);
        }

        delete Life.list2[cell];

    }
    document.getElementById("time").innerHTML = ++Life.time;
};

Life.listNear = function(cell)
{
    var list = {};
    var row, col;
    var ob = Life.getRowCol(cell);
    
    row = ob.row - 1;
    if (row < 0)
    {
        row = Life.nRow - 1;
    }

    col = ob.col;
    list[Life.getId(row, col)] = 1;
    col = ob.col - 1;
    if (col < 0) 
    {
        col = Life.nCol - 1;
    }

    list[Life.getId(row, col)] = 1;
    col = ob.col + 1;
    if (col >= Life.nCol) 
    {
        col = 0;
    }

    list[Life.getId(row, col)] = 1; 
    row = ob.row;
    col = ob.col - 1;
    if (col < 0) 
    {
        col = Life.nCol - 1; 
    }

    list[Life.getId(row, col)] = 1; 
    col = ob.col + 1;
    if (col >= Life.nCol) 
    {
        col = 0; 
    }

    list[Life.getId(row, col)] = 1; 

    
    row = ob.row + 1;
    if (row >= Life.nRow) 
    {
        row = 0 
    }

    col = ob.col;
    list[Life.getId(row, col)] = 1; 
    col = ob.col - 1;
    
    if (col < 0) 
    {
        col = Life.nCol - 1; 
    }

    list[Life.getId(row, col)] = 1; 

    col = ob.col + 1;

    if (col >= Life.nCol) 
    {
        col = 0; 
    }

    list[Life.getId(row, col)] = 1; 

    return list; 
}


Life.clear = function()
{
    if (!Life.start) 
        return;

    for (var cell in Life.list1)
    {
        var ob = Life.getRowCol(cell);

        Life.CellStatus(ob.row, ob.col, Life.emptyCell);
        delete Life.list1[cell];
    }

    Life.time = 0;

    document.getElementById("time").innerHTML = Life.time;
};

// Обработка щелчка в матрице
Life.click = function(row, col)
{
    if (!Life.start) 
        return;

    Life.changeCellStatus(row, col);
};


Life.getRowCol = function(id)
{
    var ob = {};
    var d = id.indexOf("_");
    ob.row = parseInt(id.substring(1, d));
    ob.col = parseInt(id.substring(d + 1));

    return ob;
};

Life.getId = function(row, col)
{
    return "c" + row + "_" + col;
};