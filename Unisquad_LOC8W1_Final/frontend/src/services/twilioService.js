import api from "./api";

/** Make a masked call to a worker */
export async function makeCall(workerId) {
  try {
    const response = await api.post(`/twilio/call/${workerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to make call');
  }
}

/** Send SMS to a worker */
export async function sendSMS(workerId, message) {
  try {
    const response = await api.post(`/twilio/sms/${workerId}`, { message });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to send SMS');
  }
}

/** Check Twilio configuration status */
export async function getTwilioStatus() {
  try {
    const response = await api.get('/twilio/status');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to check Twilio status');
  }
}
