import {
  GetFormFromDbId,
  GetFormWithSubmissions
} from '@/actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import VisitBtn from '@/components/VisitBtn';
import { ReactNode } from 'react';
import { StatCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { IoIosSend } from 'react-icons/io';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { MdDoNotTouch } from 'react-icons/md';
import {
  ElementsType, FormElementInstance
} from '../../../../components/FormElements';
import {
  Table,
  TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

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

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const SubmissionsTable = async ({ id }: { id: number }) => {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error('Form was not found!');
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const cols: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'TitleField':
      case 'SubtitleField':
      case 'ParagraphField':
      case 'SeparatorField':
      case 'SpacerField':
      case 'NumberField':
      case 'TextAreaField':
      case 'DateField':
      case 'SelectField':
      case 'CheckboxField':
        cols.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
    let node: ReactNode = value;

    switch (type) {
      case 'DateField':
        if (!value) break;
        const date = new Date(value);
        node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyyy')}</Badge>;
        break;
      case 'CheckboxField':
        const checked = value === 'true';
        node = <Checkbox checked={checked} disabled />;
        break;
    }

    return <TableCell>{node}</TableCell>;
  };

  return (
    <>
      <h1 className='text-2xl font-bold my-2'>Submissions</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((col) => (
                <TableHead key={col.id} className='uppercase'>
                  {col.label}
                </TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right'>
                Submited at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {cols.map((col) => (
                  <RowCell key={col.id} type={col.type} value={row[col.id]} />
                ))}
                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FormDetailsPage;
