import React, { createRef, useEffect, useRef, useState } from 'react';

const defaultStyles = {
  getContainer: (radius, fullWidth, fullHeight) => ({
    position: 'relative',
    width: fullWidth ? '100%' : `${2 * radius}px`,
    maxWidth: '100%',
    minHeight: `${2 * radius}px`,
    height: fullHeight ? '100%' : `${2 * radius}px`,
    touchAction: 'none',
  }),
};

const computeInitialPosition = (index, textsLength, size) => {
  const phi = Math.acos(-1 + (2 * index + 1) / textsLength);
  const theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
  return {
    x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
    y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
    z: (size * Math.cos(phi)) / 2,
  };
};

const updateItemPosition = (item, sc, depth) => {
  const newItem = { ...item, scale: '' };
  const rx1 = item.x;
  const ry1 = item.y * sc[1] + item.z * -sc[0];
  const rz1 = item.y * sc[0] + item.z * sc[1];

  const rx2 = rx1 * sc[3] + rz1 * sc[2];
  const ry2 = ry1;
  const rz2 = rz1 * sc[3] - rx1 * sc[2];

  const per = (2 * depth) / (2 * depth + rz2);
  newItem.x = rx2;
  newItem.y = ry2;
  newItem.z = rz2;

  if (newItem.x === item.x && newItem.y === item.y && newItem.z === item.z) {
    return item;
  }

  newItem.scale = per.toFixed(3);
  let alpha = per * per - 0.25;
  alpha = parseFloat((alpha > 1 ? 1 : alpha).toFixed(3));

  const itemEl = newItem.ref.current;
  itemEl.style.WebkitTransform = `translate3d(${(newItem.x - itemEl.offsetWidth / 2).toFixed(2)}px, ${(newItem.y - itemEl.offsetHeight / 2).toFixed(2)}px, 0) scale(${newItem.scale})`;
  itemEl.style.MozTransform = `translate3d(${(newItem.x - itemEl.offsetWidth / 2).toFixed(2)}px, ${(newItem.y - itemEl.offsetHeight / 2).toFixed(2)}px, 0) scale(${newItem.scale})`;
  itemEl.style.OTransform = `translate3d(${(newItem.x - itemEl.offsetWidth / 2).toFixed(2)}px, ${(newItem.y - itemEl.offsetHeight / 2).toFixed(2)}px, 0) scale(${newItem.scale})`;
  itemEl.style.transform = `translate3d(${(newItem.x - itemEl.offsetWidth / 2).toFixed(2)}px, ${(newItem.y - itemEl.offsetHeight / 2).toFixed(2)}px, 0) scale(${newItem.scale})`;
  itemEl.style.filter = `grayscale(${(alpha - 1) * -8}) blur(${(alpha - 1) * -5 > 1 ? Math.floor((alpha - 1) * -8) : 0}px)`;
  itemEl.style.zIndex = Math.floor(alpha * 1000);
  itemEl.style.opacity = alpha;

  return newItem;
};

const createItem = (text, index, textsLength, size, itemRef) => {
  const transformOrigin = '50% 50%';
  const transform = 'translate3d(-50%, -50%, 0) scale(1)';
  const itemStyles = {
    willChange: 'transform, opacity, filter',
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: index + 1,
    filter: 'alpha(opacity=0)',
    opacity: 0,
    WebkitTransformOrigin: transformOrigin,
    MozTransformOrigin: transformOrigin,
    OTransformOrigin: transformOrigin,
    transformOrigin: transformOrigin,
    WebkitTransform: transform,
    MozTransform: transform,
    OTransform: transform,
    transform: transform,
  };
  const itemEl = (
    <span ref={itemRef} key={index} style={itemStyles}>
      {text}
    </span>
  );

  return {
    ref: itemRef,
    el: itemEl,
    ...computeInitialPosition(index, textsLength, size),
  };
};

const defaultTexts = [ 
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/ruby.svg'} alt={'Ruby'} /> Ruby </div>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/html-5.svg'} alt={'HTML'}/> HTML </div>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/css-3.svg'} alt={'CSS'}/> CSS </div>,
  <img width={45} src={'https://cdn.svgporn.com/logos/jss.svg'} alt={'JS'}/>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/heroku-icon.svg'} alt={'Heroku'}/> Heroku </div>,
  <img width={45} src={'https://cdn.svgporn.com/logos/heroku-redis.svg'} alt={'Heroku Redis'}/>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/kubernetes.svg'} alt={'Kube'}/> Kubernets </div>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/bootstrap.svg'} alt={'bootstrap'}/> Bootstrap </div>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/react.svg'} alt={'React'}/> React </div>,
  <img width={90} src={'https://cdn.svgporn.com/logos/rails.svg'} alt={'Rails'}/>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/capistrano.svg'} alt={'Capistrano'}/> Capistrano </div>,
  <img width={45} src={'https://cdn.svgporn.com/logos/postgresql.svg'} alt={'postgres'}/>,
  <img width={45} src={'https://cdn.svgporn.com/logos/mysql.svg'} alt={'mysql'}/>,
  <img width={45} src={'https://cdn.svgporn.com/logos/sass.svg'} alt={'sass'}/>, 
  <img width={45} src={'https://cdn.svgporn.com/logos/selenium.svg'} alt={'selenium'}/>, 
  <img width={45} src={'https://cdn.svgporn.com/logos/aws.svg'} alt={'AWS'}/>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/google-cloud.svg'} alt={'GCP'}/>GCP</div>,
  <img width={45} src={'https://cdn.svgporn.com/logos/graphql.svg'} alt={'Graphql'}/>, 
  <img width={45} src={'https://cdn.svgporn.com/logos/redux.svg'} alt={'Redux'}/>, 
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/jquery.svg'} alt={'jquery'}/>Jquery </div>,
  <div className='text-center'><img width={45} src={'https://cdn.svgporn.com/logos/bootstrap.svg'} alt={'bootstrap'}/> Bootstrap </div>,
  <img width={45} src={'https://cdn.svgporn.com/logos/postgraphile.svg'} alt={'postgraphql'}/>,
  <img width={45} src={'https://cdn.svgporn.com/logos/nodejs.svg'} alt={'nodejs'}/>
];

const defaultState = {
  texts: defaultTexts,
  maxSpeed: 15,
  initialSpeed: 32,
  initialDirection: 135,
  keepRollingAfterMouseOut: true,
  useContainerInlineStyles: true,
  fullWidth: true,
  fullHeight: true,
};

function TagSphere(props) { 
  const {
    maxSpeed,
    initialSpeed,
    texts,
    initialDirection,
    keepRollingAfterMouseOut,
    fullHeight,
    fullWidth,
    style,
    useContainerInlineStyles,
  } = { ...defaultState, ...props };

  let radius = props.radius;

  if (!radius) {
    radius = texts.length * 12;
  }

  const depth = 2 * radius;
  const size = 1.5 * radius;
  const itemHooks = texts.map(() => createRef());
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(() =>
      texts.map((text, index) =>
        createItem(text, index, texts.length, size, itemHooks[index]),
      ),
    );
  }, [texts]);

  const containerRef = useRef(null);
  const [firstRender, setFirstRender] = useState(true);
  const [lessSpeed, setLessSpeed] = useState(maxSpeed);
  const [active, setActive] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    e.persist();

    const rect = containerRef.current.getBoundingClientRect();

    setMouseX(() => (e.clientX - (rect.left + rect.width / 2)) / 5);
    setMouseY(() => (e.clientY - (rect.top + rect.height / 2)) / 5);
  };

  const checkTouchCoordinates = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.targetTouches[0].clientX;
    const touchY = e.targetTouches[0].clientY;

    if (
      touchX > rect.left &&
      touchX < rect.right &&
      touchY < rect.bottom &&
      touchY > rect.top
    ) {
      return true;
    }

    return false;
  };

  const next = () => {
    setItems((items) => {
      if (lessSpeed === 0) return items;

      let a, b;
      if (!keepRollingAfterMouseOut && !active && !firstRender) {
        setLessSpeed((lessSpeedCurrent) => {
          const lessConstant = lessSpeed * (maxSpeed / 200);

          return lessSpeedCurrent - lessConstant > 0.01
            ? lessSpeedCurrent - lessConstant
            : 0;
        });

        a = -(Math.min(Math.max(-mouseY, -size), size) / radius) * lessSpeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * lessSpeed;
      } else if (!active && !firstRender && keepRollingAfterMouseOut) {
        a =
          -(Math.min(Math.max(-mouseY, -size), size) / radius) *
          (maxSpeed * 0.5);
        b =
          (Math.min(Math.max(-mouseX, -size), size) / radius) *
          (maxSpeed * 0.5);
      } else {
        a = -(Math.min(Math.max(-mouseY, -size), size) / radius) * maxSpeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * maxSpeed;
      }

      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return items;

      const l = Math.PI / 180;
      const sc = [
        Math.sin(a * l),
        Math.cos(a * l),
        Math.sin(b * l),
        Math.cos(b * l),
      ];

      return items.map((item) => updateItemPosition(item, sc, depth));
    });
  };

  const init = () => {
    setActive(false);
    const mouseX0 = initialSpeed * Math.sin(initialDirection * (Math.PI / 180));
    const mouseY0 =
      -initialSpeed * Math.cos(initialDirection * (Math.PI / 180));

    setMouseX(() => mouseX0);
    setMouseY(() => mouseY0);

    next();
  };

  useEffect(() => {
    init();
    setItems((items) => [...items]);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(next);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouseX, mouseY, lessSpeed, active, items, props.radius]);

  return (
    <div
      className={props.className}
      ref={containerRef}
      onMouseOver={() => {
        setActive(true);
        setFirstRender(false);
        setLessSpeed(maxSpeed);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={() => {
        setActive(true);
        setLessSpeed(maxSpeed);
        setFirstRender(false);
      }}
      onTouchMove={(e) => {
        if (checkTouchCoordinates(e)) {
          handleMouseMove(e.targetTouches[0]);
        } else {
          setActive(false);
        }
      }}
      style={
        useContainerInlineStyles
          ? style || defaultStyles.getContainer(radius, fullWidth, fullHeight)
          : undefined
      }
    >
      {items.map((item) => item.el)}
    </div>
  );
}

export default TagSphere;
