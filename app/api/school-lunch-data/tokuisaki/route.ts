import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// object to form data change
function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    //トークンエンドポイント取得
    const url =process.env.NAVI_TOKEN_END_POINT_REQUEST_LINK as string;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Path-Base": "/mmocc",
      },
      cache: "no-store",
    });
    const data = await response.json();
    const tokenEnpoint = data.token_endpoint;
    // アクセストークン取得
    const tokenResponse = await fetch(tokenEnpoint, {
      method: "POST",
      body: objectToFormData(reqBody),
      cache: "no-store",
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    // console.log("test",tokenData.access_token)
    // 認可データ取得
    const msttoksUrl =process.env.MSTOKS_AUTHORIZE_LINK as string;
    const msttoksResponse = await fetch(msttoksUrl, {
      method: "GET",
      headers: {
        "X-Path-Base": "/mmocc",
        Authorization: `Bearer ${accessToken}`,
        cache: "no-store",
      },
    });
    const msttoksData = await msttoksResponse.json();
    // tokuisaki all data
    let arr = [];
    for (let i = 0; i < msttoksData.length; i++) {
      let tokuisakiCd = msttoksData[i].toksCd;
      let touisakiName = msttoksData[i].toksNm;
      let tokuisaki = msttoksData[i].toksCd + " " + msttoksData[i].toksNm;
      const obj = {
        tokuisakiCd : tokuisakiCd,
        touisakiName: touisakiName,
        label: tokuisaki,
      };
      arr.push(obj);
    }

    return NextResponse.json(
      { message: "success", result:arr },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "Error", result: e }, { status: 500 });
  }
}
