import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * [신청 접수 완료 안내 메일]
 * 사용자가 병원 언어 등록 신청을 완료했을 때 발송합니다.
 */
export async function sendApplicationSubmissionEmail(
  to: string,
  hospitalName: string,
  applicationId: number,
) {
  const HANA_GREEN = '#008485';
  const BLACK_900 = '#101828';
  const BLACK_600 = '#888988';
  const GRAY_100 = '#f0f3f4';
  const WHITE = '#ffffff';

  const detailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/medical/registrations/${applicationId}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Hanaro Pass <onboarding@resend.dev>',
      to: [to],
      subject: `[Hanaro Pass] ${hospitalName} 등록 신청이 정상적으로 접수되었습니다.`,
      html: `
        <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; max-width: 540px; margin: 0 auto; background-color: ${WHITE}; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
          <div style="background-color: ${HANA_GREEN}; padding: 32px 20px; text-align: center;">
            <h1 style="color: ${WHITE}; margin: 0; font-size: 24px; font-weight: 700;">Hanaro Pass</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">병원 정보 등록 신청 접수 안내</p>
          </div>

          <div style="padding: 40px 32px;">
            <h2 style="color: ${BLACK_900}; font-size: 20px; font-weight: 700; margin: 0 0 16px 0;">
              안녕하세요, <br/>
              <span style="color: ${HANA_GREEN};">${hospitalName}</span> 관리자님
            </h2>
            
            <p style="color: ${BLACK_900}; font-size: 16px; line-height: 1.6; margin: 0;">
              신청하신 외국어 진료 가능 정보 등록 건이 정상적으로 접수되었습니다.<br/>
              운영진이 정보를 확인한 후, 심사 결과를 다시 이메일로 안내해 드리겠습니다.
            </p>

            <div style="background-color: ${GRAY_100}; border-radius: 8px; padding: 24px; margin: 32px 0;">
              <p style="margin:0; color: ${BLACK_600}; font-size: 14px;">신청 병원: <span style="color:${BLACK_900}; font-weight:600;">${hospitalName}</span></p>
              <p style="margin:8px 0 0 0; color: ${BLACK_600}; font-size: 14px;">현재 상태: <span style="color:${HANA_GREEN}; font-weight:600;">심사 대기 중</span></p>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <a href="${detailUrl}" style="display: inline-block; background-color: ${BLACK_900}; color: ${WHITE}; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
                내 신청 내역 확인하기
              </a>
            </div>
          </div>

          <div style="background-color: #fafafa; padding: 24px; border-top: 1px solid #f0f0f0; text-align: center;">
            <p style="color: #b6b6b6; font-size: 12px; margin: 0;">&copy; 2026 Hanaro Pass. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function sendApplicationResultEmail(
  to: string,
  hospitalName: string,
  status: 'APPROVED' | 'REJECTED',
  applicationId: number,
) {
  const isApproved = status === 'APPROVED';

  const HANA_GREEN = '#008485';
  const HANA_RED = '#e90061';
  const BLACK_900 = '#101828';
  const BLACK_600 = '#888988';
  const GRAY_100 = '#f0f3f4';
  const WHITE = '#ffffff';

  const statusText = isApproved ? '승인' : '반려';
  const statusColor = isApproved ? HANA_GREEN : HANA_RED;

  const detailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/medical/registrations/${applicationId}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Hanaro Pass <onboarding@resend.dev>',
      to: [to],
      subject: `[Hanaro Pass] ${hospitalName} 신청 결과가 도착했습니다.`,
      html: `
        <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; max-width: 540px; margin: 0 auto; background-color: ${WHITE}; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
          <div style="background-color: ${HANA_GREEN}; padding: 32px 20px; text-align: center;">
            <h1 style="color: ${WHITE}; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Hanaro Pass</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">병원 외국어 등록 신청 결과 안내</p>
          </div>

          <div style="padding: 40px 32px;">
            <h2 style="color: ${BLACK_900}; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.01em;">
              안녕하세요, <br/>
              <span style="color: ${HANA_GREEN};">${hospitalName}</span> 관리자님
            </h2>
            
            <p style="color: ${BLACK_900 || '#4a5565'}; font-size: 16px; line-height: 1.6; margin: 0;">
              신청하신 외국어 진료 가능 정보 등록 건에 대하여 심사가 완료되었습니다.
              귀하의 신청은 최종적으로 <strong style="color: ${statusColor};">${statusText}</strong> 되었음을 알려드립니다.
            </p>

            <div style="background-color: ${GRAY_100}; border-radius: 8px; padding: 24px; margin: 32px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: ${BLACK_600}; font-size: 14px; padding-bottom: 8px; width: 80px;">신청 병원</td>
                  <td style="color: ${BLACK_900}; font-size: 14px; padding-bottom: 8px; font-weight: 600;">${hospitalName}</td>
                </tr>
                <tr>
                  <td style="color: ${BLACK_600}; font-size: 14px;">처리 결과</td>
                  <td style="color: ${statusColor}; font-size: 14px; font-weight: 700;">${statusText} 완료</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <a href="${detailUrl}" style="display: inline-block; background-color: ${BLACK_900}; color: ${WHITE}; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
                상세 내역 및 히스토리 확인
              </a>
            </div>

            <p style="color: ${BLACK_600}; font-size: 13px; line-height: 1.5; margin-top: 32px; text-align: center;">
              ※ 승인된 정보는 지금 바로 Hanaro Pass 서비스 내 병원 찾기에서 확인하실 수 있습니다.
            </p>
          </div>

          <div style="background-color: #fafafa; padding: 24px; border-top: 1px solid #f0f0f0; text-align: center;">
            <p style="color: #b6b6b6; font-size: 12px; margin: 0;">
              본 메일은 발신 전용이며 회신되지 않습니다.<br/>
              &copy; 2026 Hanaro Pass. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Mail Exception]:', err);
    return { success: false, error: err };
  }
}
