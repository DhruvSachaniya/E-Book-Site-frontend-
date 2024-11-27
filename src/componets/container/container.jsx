import { useState } from 'react';
import SerachBox from './Serach.box';
import CatalogueBox from './catalogue.box';

export default function Container() {
  const [clickdata, setclickdata] = useState(null);

  return (
    <div className="container-head">
      <div>
        <CatalogueBox selectedclickdata={(data) => setclickdata(data)} />
      </div>
      <div>
        <SerachBox clickAtagdata={clickdata} />
      </div>
    </div>
  );
}
