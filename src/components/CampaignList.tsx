import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface CampaignListItem {
  id: number;
  businessName: string;
  label: string;
  point: number;
  capacity: number;
  email: string;
  platform: string;
  type: string;
  phone: string;
  createdAt: string;
  campaignState: string;
}

const CampaignList = () => {
  const { data } = useQuery<
    unknown,
    unknown,
    { data: { content: CampaignListItem[] } }
  >({
    queryKey: ['list'],
    queryFn: () =>
      axios.get(`${import.meta.env.AXIOS_BASE_URL}/api/admin`, {
        withCredentials: true,
      }),
  });

  if (!data) {
    return <h1>네트워크 연결에서 오류가 발생했습니다</h1>;
  }

  const campaignList = data.data.content;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>체험단명</TableHead>
          <TableHead>구분</TableHead>
          <TableHead>모집인원</TableHead>
          <TableHead>포인트</TableHead>
          <TableHead>플랫폼</TableHead>
          <TableHead>유형</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>승인일</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaignList.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell>{campaign.id}</TableCell>
            <TableCell>{campaign.businessName}</TableCell>
            <TableCell>{campaign.label}</TableCell>
            <TableCell>{campaign.capacity}</TableCell>
            <TableCell>{campaign.point}</TableCell>
            <TableCell>{campaign.platform}</TableCell>
            <TableCell>{campaign.type}</TableCell>
            <TableCell>{campaign.phone}</TableCell>
            <TableCell>{campaign.createdAt}</TableCell>
            <TableCell>{campaign.campaignState}</TableCell>
            <TableCell>
              <Link to={campaign.id.toString()}>관리</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CampaignList;
