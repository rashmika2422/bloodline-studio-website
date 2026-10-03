import Image from "next/image";
export default function StudioImage({ number, alt, sizes = "(max-width: 767px) 86vw, 50vw", className = "" }: { number: string; alt: string; sizes?: string; className?: string }) {
  return <div className={`studio-image ${className}`}><Image src={`/images/studio${number}.jpeg`} alt={alt} fill sizes={sizes} /></div>;
}
