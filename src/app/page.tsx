'use client';

import { useRouter } from "next/navigation";

export default function index() {
  return (
    <>
    {/* 리스트 페이지 forwarding 
      실질적인 index - list
    */}
      { useRouter().push('/board/list') }
    </>
  );
}