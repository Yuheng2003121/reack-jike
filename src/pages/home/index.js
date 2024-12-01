import BarChart from '@/components/BarChart';

const Home = () => {
  return (
    <div>
      <BarChart data={{ title: '三大框架满意度', xData: ['Vue', 'React', 'Angular'], yData: [10, 40, 70]}}></BarChart>
      {/* <BarChart title={'三大框架实用度'}></BarChart> */}
    </div>
  )
}

export default Home