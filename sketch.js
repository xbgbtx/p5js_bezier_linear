let p0, p1, t, pt;

function setup() 
{
    let r = createCanvas(windowWidth, windowHeight);
    console.log( r);

    p0 = createVector(100,300);
    p1 = createVector(300,100);
    pt = createVector(0,0);

    t = 0.5;

    add_interaction_cbs();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged ( e )
{
    console.log(`${mouseX}, ${mouseY}`);
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

    let t_drag = (p) =>
    {
        t = line_t_nearest_point ( p0, p1, createVector(mouseX,mouseY) );
    };

    let t_interaction = MS.Interactions.drag_points ( [pt], t_drag );
    t_interaction.priority = 10;

    MS.add_interaction_cb ( t_interaction  );
}

//Return vector2 (x,y) on line segment at time t
function line_point ( a, b, t )
{
    return p5.Vector.add( 
        p5.Vector.mult(a, 1-t), 
        p5.Vector.mult(b, t)
    );
}

//Returns t on line a,b nearest to point p
function line_t_nearest_point ( a, b, p )
{
    let v = p5.Vector.sub(b, a);
    let u = p5.Vector.sub(a, p);
    let vu = v.x*u.x + v.y*u.y;
    let vv = v.x**2 + v.y**2;

    let lt = -vu/vv;

    lt = constrain(lt,0,1);

    return lt;
}

function update_pt()
{
    pt_ = line_point ( p0, p1, t );
    pt.x = pt_.x;
    pt.y = pt_.y;
}

function draw() 
{
    MS.handle_interaction ();

    update_pt();

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
    
    MS.renderPoint(pt,
    {
        label : `t=${t.toFixed(2)}`,
        color : MS.colors.foreground[3],
    });
}

