import Image from 'next/image'

import type { BandMember } from './sections/the-band'

interface MemberCardProps {
  member: BandMember
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Image
        src={`/members/${member.photo}`}
        width={164}
        height={164}
        alt="Member Name"
        className="overflow-hidden rounded-full"
      />

      <h3 className="text-center font-heading text-2xl text-slate-500 uppercase leading-relaxed">
        {member.name}
      </h3>
      <p className="text-center">{member.title}</p>
    </div>
  )
}
