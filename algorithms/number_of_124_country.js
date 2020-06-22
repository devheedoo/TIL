/**
 * 124 나라의 숫자(https://programmers.co.kr/learn/courses/30/lessons/12899?language=javascript)
 */
function solution(n) {
    let answer = '';
    while (n > 2) {
        const rest = n % 3;
        switch (rest) {
            case 0: {
                answer = '4' + answer;
                n = ((n - rest) / 3) - 1;
                break;
            }
            case 1:
            case 2: {
                answer = rest + answer;
                n = (n - rest) / 3;
                break;
            }
        }
    }
    if (n) answer = n + answer;
    return answer;
}
