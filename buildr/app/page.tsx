import Image from 'next/image';
import Layout from './(dashboard)/layout';
import { FetchFormStats, GetFormsFromDB } from '@/actions/form';
import { LuView } from 'react-icons/lu';
import { ReactNode, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { IoIosSend } from 'react-icons/io';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { MdDoNotTouch } from 'react-icons/md';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import { IoEye } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof FetchFormStats>>;
  isLoading: boolean;
}

export default function Home() {
  return (
    <Layout>
      <div className='container pt-4'>
        <Suspense fallback={<StatCard loading={true} />}>
          <CardStatsWrapper />
        </Suspense>
        <Separator className='my-6'></Separator>
        <h2 className='text-4xl font-bold col-span-2'>Your Existing Forms</h2>
        <Separator className='my-6'></Separator>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <CreateFormBtn />
          <Suspense
            fallback={[1, 2, 3, 4].map((elements) => (
              <FormCardSkeleton key={elements} />
            ))}
          >
            <FormCards />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

const CardStatsWrapper = async () => {
  const stats = await FetchFormStats();
  return <StatsCard isLoading={false} data={stats} />;
};

const StatsCard = (props: StatsCardProps) => {
  const { data, isLoading } = props;

  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Total Visits'
        icon={<LuView className='text-purple-600' />}
        helperText='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={isLoading}
        className='shadow-md shadow-purple-600'
      />

      <StatCard
        title='Total Form Submissions'
        icon={<IoIosSend className='text-pink-600' />}
        helperText='All time form submissions'
        value={data?.submissions.toLocaleString() || ''}
        loading={isLoading}
        className='shadow-md shadow-pink-600'
      />

      <StatCard
        title='Submission Rate'
        icon={<FaBalanceScaleLeft className='text-green-600' />}
        helperText='All time rate of submissions over visits'
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={isLoading}
        className='shadow-md shadow-green-600'
      />

      <StatCard
        title='Bounce Rate'
        icon={<MdDoNotTouch className='text-yellow-600' />}
        helperText='Visits that leave without interacting 😭'
        value={data?.bounceRate.toLocaleString() + '%' || ''}
        loading={isLoading}
        className='shadow-md shadow-yellow-600'
      />
    </div>
  );
};

const StatCard = ({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: {
  title?: string;
  icon?: ReactNode;
  helperText?: string;
  value?: string;
  loading?: boolean;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && (
            <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className='text-xs text-muted-foreground pt-1'>{helperText}</p>
      </CardContent>
    </Card>
  );
};

const FormCardSkeleton = () => {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full' />;
};

const FormCards = async () => {
  const formsOfInterest = await GetFormsFromDB();

  return (
    <>
      {formsOfInterest.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card className='h-[190px]'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge className='max-w-xs'>Published</Badge>}
          {!form.published && (
            <Badge variant='destructive' className='max-w-xs'>
              Draft
            </Badge>
          )}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}

          {!form.published && (
            <span className='flex items-center gap-2 py-1'>
              <LuView className='text-purple-600' />
              <span>{form.numVisits.toLocaleString()}</span>
              <IoIosSend className='text-pink-600' />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[25px] truncate text-lg text-muted-foreground'>
        {form.description || 'No description was added!'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className='w-full my-2 text-md gap-5'>
            <Link href={`/forms/${form.id}`}>
              View Submissions <IoEye className='text-white' />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild className='w-full my-2 text-md gap-5 bg-[#bc0a63]'>
            <Link href={`/buildr/${form.id}`}>
              Edit Form <FaEdit className='text-white' />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
