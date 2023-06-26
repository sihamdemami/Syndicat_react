import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const [newUsersData, setNewUsersData] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les nouveaux utilisateurs
    axios.get('http://127.0.0.1:8000/api/users/new')
      .then(response => {
        setNewUsersData(response.data.newUsers);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* Ajoutez une série pour représenter les nouveaux utilisateurs */}
        <SeriesDirective
          dataSource={newUsersData}
          xName="date" // Remplacez "date" par la clé correspondante dans les données de l'utilisateur
          yName="count" // Remplacez "count" par la clé correspondante dans les données de l'utilisateur
          type="Line"
        />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
