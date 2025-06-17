import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import {getFeedbackByInterviewId, getReportFeedbackByInterviewId} from "@/lib/actions/general.action";

const ReportCard = async ({
    userId,
    interviewId,
    report_type,
    report_purpose,
    // timeframe,
    createdAt,
    }: ReportCardProps) => {
                                
    const reportFeedback =
        userId && interviewId
            ? await getReportFeedbackByInterviewId({
                interviewId,
                userId,
            })
            : userId;
            

    console.log("report feedback", reportFeedback)
    console.log("report feedback id", reportFeedback?.id)        
    const normalizedType = /report/gi.test(report_purpose) ? "Mixed" : report_purpose;

    const badgeColor =
        {
            Behavioral: "bg-light-400",
            Mixed: "bg-light-600",
            Technical: "bg-light-800",
        }[normalizedType] || "bg-light-600";

    const formattedDate = dayjs(
        reportFeedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    {/* Type Badge */}
                    <div
                        className={cn(
                            "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
                            badgeColor
                        )}
                    >
                        <p className="badge-text ">{normalizedType}</p>
                    </div>

                    {/* Cover Image */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover-image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />

                    {/* Interview Role */}
                    <h3 className="mt-5 capitalize">{report_type}</h3>

                    {/* Date & Score */}
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image
                                src="/calendar.svg"
                                width={22}
                                height={22}
                                alt="calendar"
                            />
                            <p>{formattedDate}</p>
                        </div>

                        {/* <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" width={22} height={22} alt="star" />
                            <p>{reportFeedback?.totalScore || "---"}/100</p>
                        </div> */}
                    </div>

                    {/* Feedback or Placeholder Text */}
                    <p className="line-clamp-2 mt-5">
                        {report_purpose ||
                            "You haven't taken this report yet. Take it now to see if its for you."}
                    </p>
                </div>

                <div className="flex flex-row justify-between">
                    {/*<DisplayTechIcons techStack={techstack} />*/}

                    <Button className="btn-primary">
                        <Link
                            href={
                                reportFeedback
                                    ? `/interview/${interviewId}/feedback`
                                    : `/interview/${interviewId}`
                            }
                        >
                            {reportFeedback ? "Check Feedback" : "View Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;