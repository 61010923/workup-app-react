import React, { useState, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import OwlCarousel from 'react-owl-carousel'
import Typography from '@mui/material/Typography'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _toNumber from 'lodash/toNumber'
import axios from 'axios'
import Card from '../../component/Cart'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import sony from '../../image/sony.png'
import TabJob from '../../component/TabJob'
import CompaniesItem from '../../component/CompaniesItem'
import CardGlass from '../../component/CardGlass'
import CardCareer from '../../component/CardCareer'
import StackedCard from '../../component/Stacked-card'

const jobTypeArray = [
  {
    id: 'Law',
    value: 'กฎหมาย',
  },
  {
    id: 'Market',
    value: 'การตลาด',
  },
  {
    id: 'Agriculture',
    value: 'เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่',
  },
  {
    id: 'Sale',
    value: 'ขาย',
  },
  {
    id: 'Drawing',
    value: 'เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม',
  },
  {
    id: 'Computer',
    value: 'คอมพิวเตอร์/IT/โปรแกรมเมอร์',
  },
  {
    id: 'Finance_Banking',
    value: 'งานการเงิน-ธนาคาร',
  },
  {
    id: 'Stock',
    value: 'งานขนส่ง-คลังสินค้า',
  },
  {
    id: 'BOI',
    value: 'งานนำเข้า-ส่งออก',
  },
  {
    id: 'Relation',
    value: 'งานบริการลูกค้า-Call Center',
  },
  {
    id: 'Account',
    value: 'งานบัญชี',
  },
  {
    id: 'Acting',
    value: 'งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume',
  },
  {
    id: 'Ga',
    value: 'จัดซื้อ/ธุรการ/ประสานงานทั่วไป',
  },
  {
    id: 'Safety',
    value: 'เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO',
  },
  {
    id: 'Technical',
    value: 'ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์',
  },
  {
    id: 'Writer',
    value: 'นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา',
  },
  {
    id: 'Human',
    value: 'บุคคล/ฝึกอบรม',
  },
  {
    id: 'Qc',
    value: 'ผลิต/ควบคุมคุณภาพ/โรงงาน',
  },
  {
    id: 'Manager',
    value: 'ผู้จัดการ/ผู้อำนวยการ/MD/CEO',
  },
  {
    id: 'Security',
    value: 'แผนกรักษาความปลอดภัย/งานอาคารจอดรถ',
  },
  {
    id: 'Doctor',
    value: 'แพทย์/เภสัชกร/สาธารณสุข',
  },
  {
    id: '41',
    value: 'ภูมิศาสตร์/แผนที่/GIS/ผังเมือง',
  },
  {
    id: 'HouseKeeper',
    value: 'แม่บ้าน/พี่เลี้ยง/คนสวน',
  },
  {
    id: 'Civil',
    value: 'โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา',
  },
  {
    id: 'GUIDE',
    value: 'ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว',
  },
  {
    id: 'Secretary',
    value: 'เลขานุการ',
  },
  {
    id: 'Chemical',
    value: 'วิทยาศาสตร์/Lab/วิจัยพัฒนา',
  },
  {
    id: 'Engineer',
    value: 'วิศวกร',
  },
  {
    id: 'ECONOMIC',
    value: 'วิจัย / วิเคราะห์ ( เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร )',
  },
  {
    id: 'Ads',
    value: 'ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ',
  },
  {
    id: 'Driver',
    value: 'ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์',
  },
  {
    id: 'MassComm',
    value: 'สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์',
  },
  {
    id: 'HealthCare',
    value: 'สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา',
  },
  {
    id: 'Garment',
    value: 'เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น',
  },
  {
    id: 'Web',
    value: 'ออกแบบเว็บไซต์/Web',
  },
  {
    id: 'Jew',
    value: 'อัญมณีและเครื่องประดับ',
  },
  {
    id: 'Teacher',
    value: 'อาจารย์/ครู/งานวิชาการ',
  },
  {
    id: 'COOK',
    value: 'อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ',
  },
  {
    id: 'Parttime',
    value: 'งาน Part-time/พนักงานชั่วคราว',
  },
  {
    id: 'Freelance',
    value: 'Freelance',
  },

]
const options = {
  // margin: 30,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: true,
  // navText: ['Prev', 'Next'],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
    1400: {
      items: 5,

    },
  },
}
const useStyles = makeStyles({
  container: {
    // marginTop: '80px',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  urgentJob: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    // width: '95%',
  },
  hotCompanies: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gridGap: '8px',
  },
})
function Home() {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState([])
  const [positions, setPositions] = useState([])
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company`,
      )
      if (response.status === 200) {
        setCompany(_get(response, 'data.data'))
        setPositions(_get(response, 'data.announce'))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (

    <Box className={classes.container}>
      <Typography
        variant="h6"
        m={2}
        sx={{
          fontWeight: 'bold',
        }}
      >
        TOP COMPANIES
      </Typography>
      {loading ? (
        <Box sx={{
          display: 'flex', height: 216, overflow: 'hidden', flexWrap: 'wrap',
        }}
        >
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
        </Box>
      ) : (
        <OwlCarousel className="owl-theme" {...options}>
          {_map(company, ({
            announceText, companyId, companyName, imgCover, imgProfile,
          }, i) => (
            <Card key={companyName + i} title={companyName} image={imgProfile} cover={imgCover} describe={announceText} companyId={companyId} />
          ))}
        </OwlCarousel>
      )}
      <Typography
        variant="h6"
        m={2}
        sx={{
          fontWeight: 'bold',
        }}
      >
        Types of Careers
      </Typography>
      <OwlCarousel className="owl-theme" {...options}>
        {_map(jobTypeArray, ({ id, value }) => <CardCareer title={value} />)}
      </OwlCarousel>
      <Typography
        variant="h6"
        m={2}
        sx={{
          fontWeight: 'bold',
        }}
      >
        URGENT JOBS
      </Typography>
      {loading ? (
        <Box>
          <Skeleton
            variant="rectangular"
            height={70}
            width="100%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={70}
            width="100%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={70}
            width="100%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={70}
            width="100%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
        </Box>
      ) : (
        <Box className={classes.urgentJob}>
          {_map(positions, ({
            companyName, id, imgProfile, position, salary,
          }, i) => (
            <TabJob
              key={id}
              positionId={id}
              companyName={companyName}
              imgProfile={imgProfile}
              position={position}
              salary={salary}
            />

          ))}
        </Box>
      )}
      <Typography
        variant="h6"
        m={2}
        sx={{
          fontWeight: 'bold',
        }}
      >
        HOT COMPANIES
      </Typography>
      {loading ? (
        <Box sx={{
          display: 'flex', height: 216, overflow: 'hidden', flexWrap: 'wrap',
        }}
        >
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="23%"
            sx={{ margin: '8px', borderRadius: '8px' }}
          />
        </Box>
      ) : (
        <Box className={classes.hotCompanies}>
          {_map(company, ({
            announceText, companyId, companyName, imgCover, imgProfile,
          }, i) => (
            <CardGlass
              key={companyName + i}
              title={companyName}
              image={imgProfile}
              cover={imgCover}
              describe={announceText}
              companyId={companyId}
            />
          ))}
        </Box>
      )}
      <Box>
        <StackedCard />
      </Box>
    </Box>

  )
}

export default Home
