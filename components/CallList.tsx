"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CallList = ({type}:{type:"ended"|"upcoming"|"recordings"}) => {
    const {endedCalls,upcomingCalls,callRecordings,isLoading}=useGetCalls()
    const router=useRouter()
const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls=()=>{
        switch (type) {
            case "ended":
                return endedCalls
              case "recordings":
        return recordings
            case "upcoming":
            return upcomingCalls
            default:
              return  []
              
        }
    }

    const getNoCallsMessage=()=>{
        switch (type) {
            case "ended":
                return "No Previous Calls"
              case "recordings":
        return "No Recordings"
            case "upcoming":
            return"No Upcoming Calls"
            default:
              return  []
              
        }
    }
    const calls =getCalls()
    const NoCallsMessage =getNoCallsMessage()

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls&&calls.lenght>0?calls.map((meeting:Call|CallRecording)=>(
            <MeetingCard/>
        ))}
    </div>
  )
}

export default CallList