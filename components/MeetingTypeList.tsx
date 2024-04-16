"use client"
import React, { useState } from 'react'
import Image from "next/image"
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from "react-datepicker"

const MeetingTypeList = () => {
    const router = useRouter();
    const { toast } = useToast()
    const [meetingState, setMeetingState] =
        useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>()

    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setcallDetails] = useState<Call>()
    const createMeeting = async () => {
        if (!values.dateTime) {
            toast({
                title: "Please select date and the time",
            })
            return
        }
        if (!client || !user) return;
        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id)
            if (!call) throw new Error("Faild to create call")
            const startsAt = values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString()
            const description = values.description || "InstantMeeting"
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setcallDetails(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created!!",
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Faield to create meeting",
            })
        }
    }
    const meetingLink=`${process.env.NEXT_PUBLICK_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start a meeting"
                handleClick={() => setMeetingState("isInstantMeeting")}
                className="bg-orange-1"

            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your Meeting"
                handleClick={() => setMeetingState("isScheduleMeeting")}
                className="bg-blue-1" />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your recordings"
                handleClick={() => setMeetingState("isJoiningMeeting")}
                className="bg-purple-1" />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Via inv link"
                handleClick={() => setMeetingState("isJoiningMeeting")}

                className="bg-yellow-1" />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add the description
                        </label>
                        <Textarea className='border-none bg-dark-3 
                        focus-visable:ring-0 focus-visible-ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }}
                        />
                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select Date and time
                        </label>
                        <ReactDatePicker 
                        selected={values.dateTime}
                        onChange={(date)=>setValues({...values,dateTime:date!})}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        timeCaption='time'
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) :
                (
                    <MeetingModal
                        isOpen={meetingState === "isScheduleMeeting"}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        className="text-center"
                        handleClick={() => {
                                 navigator.clipboard.writeText(meetingLink)
                             toast ({title:"Link copied"})
                        }}
                        image='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                        buttonText="Copy Meeting Link"

                    />
                )
            }
            image
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start a meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList