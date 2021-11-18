let p0, p1, t, tSlider;

function setup() 
{
    createCanvas(400,400);
    p0 = createVector(100,300);
    p1 = createVector(300,100);
    t = 0.5;
    tSlider = createSlider(0, 1,t, 0.05);
    tSlider.position(10,10);

    add_interaction_cbs();
}

function add_interaction_cbs ()
{
    let point_drag = (p) =>
    {
        p.x = mouseX;
        p.y = mouseY;
    };

    MS.add_interaction_cb ( 
        MS.Interactions.drag_points ( [p0, p1], point_drag )
    );
}

function draw() 
{
    MS.handle_interaction ();

    background(MS.colors.background);

    stroke(MS.colors.foreground[0]);
    strokeWeight(1);
    line(p0.x, p0.y, p1.x, p1.y);

    MS.renderPoint(p0,
    {
        label : "p0",
        color : MS.colors.foreground[1],
    });
    MS.renderPoint(p1,
    {
        label : "p1",
        color : MS.colors.foreground[2],
    });
    
    t=tSlider.value();
    
    pt = p5.Vector.add( 
        p5.Vector.mult(p0, 1-t), 
        p5.Vector.mult(p1, t)
    );
    MS.renderPoint(pt,
    {
        label : `t=${t}`,
        color : MS.colors.foreground[3],
    });
}

