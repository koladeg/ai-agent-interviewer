import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.action'
import {getInterviewsByUserId, getLatestInterviews, getLatestReports, getReportsByUserId} from '@/lib/actions/general.action'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReportCard from "@/components/ReportCard";

export default async function page() {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews, latestReports, userReports] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
    getLatestReports({ userId: user?.id! }),
    getReportsByUserId(user?.id!)
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;
  const hasUpcomingReports = latestReports?.length! > 0;
  const hasPastReports = userReports?.length > 0;

  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Create Reports with Ease</h2>
        <p className='text-lg'>
          Get AI-powered report generation and insights
        </p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start Creating Your Reports</Link>
        </Button>
      </div>
      <Image src="/roboto.png" alt="robo-dude" width={400} height={400} className='max-sm:hidden' />
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      {/* <h2>Your Interviews {hasPastInterviews} {}</h2>
      <div className='interviews-section'>
        {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )}
      </div> */}
      <div>
        <h2>Your Reports</h2>
        <div className='interviews-section'>
          {hasPastReports ? (
              userReports?.map((report) => (
                  <ReportCard
                      key={report.id}
                      userId={user?.id}
                      report_type={report.report_type}
                      report_purpose={report.report_purpose}
                      // type={report.type}
                      interviewId={report.id}
                      createdAt={report.createdAt}
                  />
              ))) : (
              <p>You haven&apos;t made any reports yet</p>
          )}
        </div>
      </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      {/* <h2>Take an Interview</h2>

      <div className='interviews-section'>
      {hasUpcomingInterviews ? (
            latestInterviews
            ?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))) : (
              <p>There are no interviews available</p>
            )}
      </div> */}
      <h2>Make a Report</h2>

      <div className='interviews-section'>
      {hasUpcomingReports ? (
            latestReports
            ?.map((report) => (
              <ReportCard
                  key={report.id}
                  userId={user?.id}
                  report_type={report.report_type}
                  report_purpose={report.report_purpose}
                  // type={report.type}
                  interviewId={report.id}
                  createdAt={report.createdAt}
              />
          ))) : (
              <p>There are no reports available</p>
            )}
      </div>
    </section>
    </>
  )
}
