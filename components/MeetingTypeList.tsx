"use client"
import React, { useState } from 'react'
import Image from "next/image"
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
    const router =useRouter();
    const[meetingState,setMeetingState]=
    useState<"isScheduleMeeting"|"isJoiningMeeting"|"isInstantMeeting"|undefined>()
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols2 xl:grid-cols-4'>
            <HomeCard
            img="/icons/add-meeting.svg"
            title="New Meeting"
            description="Start a meeting"
            handleClick={()=>setMeetingState("isJoiningMeeting")}
            className="bg-orange-1"
            
            />
            <HomeCard
                      img="/icons/schedule.svg"
                      title="Schedule Meeting"
                      description="Plan your Meeting"
                      handleClick={()=>setMeetingState("isScheduleMeeting")}
                      className="bg-blue-1"/>
            <HomeCard
                      img="/icons/recordings.svg"
                      title="View Recordings"
                      description="Check out your recordings"
                      handleClick={()=>setMeetingState("isJoiningMeeting")}
                      className="bg-purple-1"/>
            <HomeCard
                      img="/icons/join-meeting.svg"
                      title="Join Meeting"
                      description="Via inv link"
                      handleClick={()=>setMeetingState("isJoiningMeeting")}

                      className="bg-yellow-1"/>
                      <MeetingModal/>
         </section>
    )
}

export default MeetingTypeList