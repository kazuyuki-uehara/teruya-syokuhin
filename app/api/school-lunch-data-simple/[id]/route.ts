import { SchoolLunchDataRepository } from "@/app/_repositories/SchoolLunchData";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = params
    return NextResponse.json({ message: "success",result:id});
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedOrder = await SchoolLunchDataRepository.remove(params.id);
    return NextResponse.json(deletedOrder);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reqBody = await request.json();
    // console.log("kdjfflaksfjasf;;a",reqBody);
    const result = await SchoolLunchDataRepository.update(params.id, reqBody);
    return NextResponse.json(result);
  } catch (e) {
    console.log("Error",e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();

//     return NextResponse.json({ message: "success", result: reqBody });
//   } catch (e) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
// }
