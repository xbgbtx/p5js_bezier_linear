let p0, p1, t, tSlider;

function setup() 
{
    createCanvas(400,400);
    p0 = createVector(100,300);
    p1 = createVector(300,100);
    t = 0.5;
    tSlider = createSlider(0, 1,t, 0.05);
    tSlider.position(10,10);
}

function draw() 
{
    background(128);
    MS.renderPoint(p0,
    {
        label : "p0",
    });
    MS.renderPoint(p1,
    {
        label : "p1",
    });
    
    t=tSlider.value();
    
    pt = p5.Vector.add( 
        p5.Vector.mult(p0, 1-t), 
        p5.Vector.mult(p1, t)
    );
    MS.renderPoint(pt,
    {
        label : `t=${t}`,
    });
}

