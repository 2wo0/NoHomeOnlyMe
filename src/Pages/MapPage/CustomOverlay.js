const { naver } = window;

export const CustomOverlay = function (options) {
  const { name, type, count, room_id } = options;
  const CustomOverlayInnerHTML = (name, type) => {
    if (type === 'subway') {
      return `<div style="
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      position:absolute;
      font-size: 12px;
      cursor: pointer;
    ">
      <h1 style="
        position: relative;
        height: 25px;
        padding: 0 8px;
        color: #1ba885;
        background-color: white;
        border: 1px solid #1ba885;
        border-radius: 50px;
        text-align: center;
        line-height: 25px;
        font-weight: bold;
        z-index: 1;
      ">
        <i class="fas fa-subway"></i>
      </h1>
    
      <p style="
        position: relative;
        left: -23px;
        height: 25px;
        padding: 0 10px 0 30px;
        color: white;
        background-color: #1ba885;
        border: 1px solid #1ba885;
        border-radius: 30px;
        text-align: center;
        line-height: 25px;
      ">
      ${name}
      </p>
      
    </div>`;
    } else if (type === 'univ') {
      return `<div style="
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      position:absolute;
      font-size: 12px;
      cursor: pointer;
    ">
      <h1 style="
        position: relative;
        top: 6px;
        height: 25px;
        padding: 0 8px;
        color: #8782ea;
        background-color: white;
        border: 1px solid #8782ea;
        border-radius: 50px;
        text-align: center;
        line-height: 25px;
        font-weight: bold;
        z-index: 1;
      ">
        <i class="fas fa-university" />
      </h1>
    
      <p style="
        position: relative;
        left: -23px;
        height: 25px;
        padding: 0 10px 0 30px;
        color: white;
        background-color: #8782ea;
        border: 1px solid #8782ea;
        border-radius: 30px;
        text-align: center;
        line-height: 25px;
      ">
      ${name}
      </p>
      
    </div>`;
    }
  };

  const el = document.createElement('div');
  if (type === 'room') {
    // el.innerHTML = CustomOverlayInnerHTML(name, type, count);
    const el_body = document.createElement('div');

    el_body.addEventListener('click', function () {
      options.getRoomListData(room_id.join(','));
    });
    el_body.style.display = 'flex';
    el_body.style['align-items'] = 'center';
    el_body.style['flex-wrap'] = 'nowrap';
    el_body.style.position = 'absolute';
    el_body.style['font-size'] = '12px';
    el_body.style.cursor = 'pointer';

    const el_h1 = document.createElement('h1');
    el_h1.style.position = 'relative';
    el_h1.style.height = '25px';
    el_h1.style.padding = '0 8px';
    el_h1.style.color = 'white';
    el_h1.style['background-color'] = '#326cf9';
    el_h1.style.border = '#1px solid #326cf9';
    el_h1.style['border-radius'] = '50px';
    el_h1.style['text-align'] = 'center';
    el_h1.style['line-height'] = '25px';
    el_h1.style['font-weight'] = 'bold';
    el_h1.style['z-index'] = '1';

    el_h1.innerHTML = `${count}`;

    el_body.appendChild(el_h1);

    const el_p = document.createElement('p');
    el_p.style.position = 'relative';
    el_p.style.left = '-23px';
    el_p.style.height = '25px';
    el_p.style.padding = '0 10px 0 30px';
    el_p.style.color = '#326cf9';
    el_p.style['background-color'] = 'white';
    el_p.style.border = '1px solid #326cf9';
    el_p.style['border-radius'] = '30px';
    el_p.style['text-align'] = 'center';
    el_p.style['line-height'] = '25px';

    el_p.innerHTML = `${name}`;

    el_body.appendChild(el_p);

    el.appendChild(el_body);
  } else {
    el.innerHTML = CustomOverlayInnerHTML(name, type);
  }

  this._element = el.children[0];
  this.setPosition(options.position);
  this.setMap(options.map || null);
};

CustomOverlay.prototype = new naver.maps.OverlayView();
CustomOverlay.prototype.constructor = CustomOverlay;
CustomOverlay.prototype.onAdd = function () {
  const overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.appendChild(this._element);
};

CustomOverlay.prototype.setPosition = function (position) {
  this._position = position;
  this.draw();
};

CustomOverlay.prototype.getPosition = function () {
  return this._position;
};

CustomOverlay.prototype.draw = function () {
  if (!this.getMap()) return;
  const projection = this.getProjection();
  const position = this.getPosition();
  const pixelPosition = projection.fromCoordToOffset(position);
  this._element.style.left = `${pixelPosition.x}px`;
  this._element.style.top = `${pixelPosition.y}px`;
};

CustomOverlay.prototype.onRemove = function () {
  let overlayLayer = this.getPanes().overlayLayer;
  overlayLayer.innerHTML = '';
};
