import { GetFormFromDbId, GetFormsFromDB } from '@/actions/form';
import FormBuildr from '@/components/FormBuildr';
import FormLinkShare from '@/components/FormLinkShare';
import VisitBtn from '@/components/VisitBtn';
import React from 'react';
import { StatCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { IoIosSend } from 'react-icons/io';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { MdDoNotTouch } from 'react-icons/md';

async function FormDetailsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const form = await GetFormFromDbId(Number(id));

  if (!form) {
    throw new Error("Form doesn't exist!");
  }

  const { numVisits, submissions } = form;

  let submissionRate = 0;

  if (numVisits > 0) {
    submissionRate = (submissions / numVisits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className='py-10 border-t border-b border-muted'>
        <div className='flex justify-between container'>
          <h1 className='text-4xl font-bold truncate'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
        <div className='py-4 border-b border-muted'>
          <div className='container flex gap-2 items-center justify-between'>
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
        </div>
        <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
          <StatCard
            title='Total Visits'
            icon={<LuView className='text-purple-600' />}
            helperText='All time form visits'
            value={numVisits.toLocaleString() || ''}
            loading={false}
            className='shadow-md shadow-purple-600'
          />

          <StatCard
            title='Total Form Submissions'
            icon={<IoIosSend className='text-pink-600' />}
            helperText='All time form submissions'
            value={submissions.toLocaleString() || ''}
            loading={false}
            className='shadow-md shadow-pink-600'
          />

          <StatCard
            title='Submission Rate'
            icon={<FaBalanceScaleLeft className='text-green-600' />}
            helperText='All time rate of submissions over visits'
            value={submissionRate.toLocaleString() + '%' || ''}
            loading={false}
            className='shadow-md shadow-green-600'
          />

          <StatCard
            title='Bounce Rate'
            icon={<MdDoNotTouch className='text-yellow-600' />}
            helperText='Visits that leave without interacting 😭'
            value={bounceRate.toLocaleString() + '%' || ''}
            loading={false}
            className='shadow-md shadow-yellow-600'
          />
        </div>
      </div>

      <div className='container pt-5'>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

const SubmissionsTable = ({ id }: { id: number }) => {
  return (
    <>
      <h1 className='text-2xl font-bold my-2'>Submissions</h1>
    </>
  );
};

export default FormDetailsPage;
