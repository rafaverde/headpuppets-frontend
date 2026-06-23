import Image from 'next/image'

export default function MemberCard() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Image
        src="/temp-member.png"
        width={164}
        height={164}
        alt="Member Name"
      />

      <h3 className="text-center font-heading text-2xl text-slate-500 uppercase">
        Anna Sinthia
      </h3>
      <p className="text-center">Lead Vocal</p>
    </div>
  )
}
