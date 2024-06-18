import React, { useEffect } from 'react';

const AgodaWidget = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "//cdn0.agoda.net/images/sherpa/js/sherpa_init1_08.min.js";
    script1.async = true;

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.type = "text/javascript";
      script2.innerHTML = `
        var stg = new Object(); 
        stg.crt="68112323875964";
        stg.version="1.04"; 
        stg.id=stg.name="adgshp1883305435"; 
        stg.width="320px"; 
        stg.height="420px";
        stg.ReferenceKey="5HqF0Pgnbvs/nDdIc7daMg=="; 
        stg.Layout="SquareCalendar"; 
        stg.Language="en-us";
        stg.Cid="1814102"; 
        stg.DestinationName="Moscow";
        stg.OverideConf=false;
        stg.Tag="sdfsdf"; 
        new AgdSherpa(stg).initialize();
      `;
      document.body.appendChild(script2);
    };

    document.body.appendChild(script1);

    return () => {
        document.body.removeChild(script1);

    };
  }, [

  ]);

  return (
    <div>
      <div id="adgshp1883305435" style={{ width: '320px', height: '420px' }}></div>
    </div>
  );
};

export default AgodaWidget;
