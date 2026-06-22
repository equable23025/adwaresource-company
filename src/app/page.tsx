'use client';

import React, { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nProvider';

const SERVICE_PLACEHOLDER = '';
const SERVICE_ICONS = [
  'fa-book',
  'fa-magnifying-glass',
  'fa-file-invoice-dollar',
  'fa-industry',
  'fa-users',
  'fa-file-signature',
] as const;
const BLOG_ICONS = ['fa-book-open', 'fa-calculator', 'fa-industry'] as const;

const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAA+AElEQVR42u19e3hcZbX+u9b37ZlJWi5toXIVwbZJUwExJGkLMigeRUE5KlPxqHiU4w1FkdKmBXU6Kr2kXM4R9Sj6U/GC2PHGRUBFZATaJm1AwKZJWgqVmxShUNoks/f3rfX7Y88kaWmTaZsU5LCfh4dS9tz2ur3rXZcPeIVdGWRM6Y80Y+ql1zbVzP0YAKTTWbv775blTGaZySLLeIVe9EoTfh553zjpgv3Jjvlpwo59d+i2Pifq/21V19LV5f9fyfvUoU5zyMnA3yoBpK8qwMv0SqeztlDIuROmzj4qocnbmXiSk+L1hoNzVPVRdX5m2/qWx4AsYzvBDjyLTCbD+fwyKQu6aeqXJhP0QqjftLJzca78Ga8kBXi5ujbKZJaZTGaZQQXutyyYE2sumplE6kEmiooazljVtfSD3kffTdgxR8LSL+rrs9UD1jzos+Kwofl83gOkM6bMP216zbxbGOi2nDzfcHLBiZMvvrhQyLk9CyWveoDdduM7xuJdWi2WcR6z/PSa+f8Boh8S0befp+7mjo58mMksM11dralk0dyTtGOPL7oXrl/VtfSDJYXxAPpd+nHHzR5T3Zc4R42er6LHEdAJ1WVQbQfz/zMmdUjoez++uqvlh68kT/AyUoCypeckg4z5+9TXn02wZ7li78LVG67424sf+kBMbqydmyXYD3uSz6xeu/j2wWAwj7xvmHzJG9nI3YYTY5zr+3pbd8uX+73GtEuPNCJnMsxpUIiI/7MivK2t+4qHy580feq8t5GaWxRKHn7Wqs4lv3mlKAG9PKx+mcljlgeAptr574PqpczmTUQGIu4p8VGmbd3SuwY9dAKg6aOyqb6q8GtQGZcyL1xY6Pj21h2tu/yapilzzmeb/JaqQCDntq1d/JOGyRe/ka2tUcXmqmSyrXB/7rnBzyadzpqnnwZ3dOTCxsmzP2eDMVeLRD0k7j0rupf+6ZWgBPRysfqGqXOnsZglzOYMVYGX0BMgxDYAqFdJPti2dskN9fWfDNrbr3Ezjpl9sAT2IzC0rrVj8Y27Dh8DStBYM3eZNcmMl6gXom9v7V5y93aKmMmYTZvqqFCADA45g17/rcBWn+9c32aBf3ucWQwo76sKsIexvrF23oUE+jqTGeOkVwDW+MspK6BMzIARwH+6tbPle8cdN3tMVZ89gZ3rXrHhik2l95LBMX1ninbyscUDolBWMyeOEXVPONYZ7R1LHq2v/6Rtb7/G7fr1oAwyvCldR73/6L01MFVvi1zfE8r0llWdi7srTS9fVYCyRSFrC8i5pqM//xpKjvkusz3L+SJUxROBAJDhJIl6iDohgABSY5Is3n2ptWvxZf2iRZZzOweIO+cIJs95MxnzJyITqEbtbkzVKe3t6AMW6NB5fgxEZxwze6IP7D3WJCc537eexZ66ct3Cx4GMwb+gEuzzNDCdLgm/dl49ktX3ENmzItfrAI2tniwbTpLX8Feq8pDlFKvCAyDvi96Y4OtNNfOuLAslV+Hn5pH36XTWtq1behdEv0IAmIJ6u633R0BO0ukFZmiDiMHpig1XbBLGLC/hC5YTk5TlpuOP/8KBsfD/9RhD81KQNQ21c84k5ZuJ6BAvRUdEVlXF2pRRkY2i+ERb15IFh0+YfhMRvcVw4lAR54nIeo2cNamTDh0/vfaQ1z19w5NPXulj6+sYlqXbuLEgmUzG/OGua+46bMLMJiKazGSnHTZhhlneftmf0ums3bixsEtv0oEOTaezdsXqy544fMLMdQBmMdtDjTNNk8ac9ouNzy9wsVEV9FUPsCuypnbuOQz7W5CO9RIKEQwAtbbKiMgyhD1NbV2LfplOZ21b9xUP+y0vvFXE3x7YKquqjkA2cj3OmuQ5dtuEm44/Kra+QTWAoT1Bvk4BJTX+46ryhGgkzPbLDTVzPlQo5FwaQxM9ZTKoravll17ly4CCybylL9X3cwDIZv+1GFbal8Jvqp17DsFeJ+oAiCoAJsMEElE0t3UtvnwwRijH1bq6TGKsP+Zaa5LnRL7HEcioqrcmZVV9u4uK71390JWPVpqW9eOB2ovfzgh+L+o9MUcayVva1resrATU9WcGU+b+1JjgQwDBafiDVZ0t55W+vx8CVP7fCQFpZG1hY8411cx5D8guU/VUEr4yWQPw8wI/a1VXy48ymYzp6FiDjXhLyQ13KJDlp5/+tn/8mXt+efj4mftbkzxJNFIisIjzhoMjiPmsww9sun35fYueGs6ND3bly9sXrTtswgxjOHmqqjfEfPqR4xqW/eHZ//d8HM937co3biwokOVJY4Pfhab4b0Q4wlBwwmETZlYtf+ayP1TyPV7xISCDjCkg5xpr504H2euhEgtfoYYTBsDjou5tqzqX3pxOZ22Zi98RfAGKbDbLK7sWzXau2Gw4yQCDCOx80RPxMWQTf26cPOfNlfL1hULOZzLLTFtX9QLx4Z+JmIj4COFE/vRJ/5PMDu8hFQAKG3N94lxGVR4XjdSwbW6ccvHcf5W6wSgqQJbzyPsTp116JMH8iqBVAq+qCsOBUdWNXv1pq7qWrh7edZPmcjmNcUFLi3j3EYZxRIZBIC+RB3QiGfv7ppo576nw4Ws+v0aBnHrvPqqqm0ScsyaYsdk8fk0OOUmns8N4yDgzWP3QlY8KfAbgopfQG5NY0lQz92P/CkowWiGAMpmJDGSCpIQ3G7J1XkIPAhlOsAJPCPRtq7tauneHTt24sSDpdNbec+9lfz30oJltTPYMJq5W9QoIiJAgMh84bMJJjy1vv6y95IaHiMMFzWSWmdvvvui5ww6a0Wk4+LD3xdDa1JsOGddYXH7vor9UlBkga5f/c9Hfj5ww4xHmxNneR47YnnXEhBl/vad94dqXczgYFQVIp7P2llu+7Y8e13ilNamzne91RDBMhgi0xZO8Y3XnkjVlfLA7711WguXtC9cdOq7p98zmdMPBeBHvASWFgjnx74cdND1c3r7wL9lslguFwq7xQEe+JMCFnYdNmFFlbCrtXW9oTOIdh41v+uvyexetzWSWmY6O/K7xAEqK2b7w/sPGz7DGpk4VCT2Rfd8R408q3HPvZY+8XJVgxLOAMoI+sWbOewJO3OAkdAQYgITJwEt05qruy2/b20JK+fX1xzS/Nkjyrwmm3vk+159Wmir2El7e2rlkTlw5XEDYNWNImcwyBoC/P7D6z8T2zSLOgbhXEM1c3XnF3yrIDCidzppyzcFwIuMlFIbZLB6ntK1f1PFypIxHWAFKnPukcEJk5H4QDlH1qoAEpspGPvz8qq4lV49UFa38QOuPaT4gSPB1zPZdkYu9jQI+MNXWa/jj1MQV5xUKBTdEX0E/1dtU0/w6gFcr/IFExkClO0jQ9LsfXPwckB1KiVBWtPpDkbIHFP9CRPWqAgU9IlF4yuqHrnz05UYZjygIzGSmEZCTovFXGJM4VMSLAhqYKut837UjKfwyvQtkTPuGJc8f2bn+PV6iHwS2yipICDCR63GGEuf2/WPGb+vqzh9bBm27BHSZZaa1a8kjqu6/DAdG1BWZgylhKNcBigw6aGijiTOY9idzPZb1fSr6pAKeiV9ngkQ/afVyooxppF1/Y+28tzOZ33sfelCM+EVk7QFJ1zDzgbG9uWGLLnvqeeL3baxp/qrh4MteigooVOEDW2W9uOUo4n2tDy96KpNZZvL5nZdwBxE8l1ubmh25nr7AVqci33fVqq6WiypR4EwmY/L5vJ8+5eKTYBJ/Eh+RMcmEaPTnca7nnU3rx0ej8xxeOhBIHcjg9EnvS/TSC78mYKJClMAgsCeR9/xl7eWPTMRE7sCsUQBCBQVylEHG/PGZa+44fPyMTczmXSBihSImjBJHwegZh4w7+dbb7/rCs7sCZRs3xplByJv/FL5QPM2axDFOisXApE4+ZFzT48vvXbg6jazdiCEyg444M7jnmUUbDxs/faMxybOdFPusSU7eRjT1un8u/EUm02E6OjpeGSEgg2UM5GSzeeLT1iSmeYk8VGFM0oi6xSvXtbSl01k7ygBI88hLOp21rd1L/ldV3wvwNkOWAZDzfR5EU62hO0+c2nzCEDm65vNrtFDIOaj7iIh/lokD54vOsP124+Q5by4g5+KG1SFUEqWaQffSn3gffj0wVanI9/ZZTr2/sab5W/l83pd4BvoX9wBZ7sBntaG2OAHQ6xVSrapiOGFF3Jpn/eEfPu20j+OWWz63T1Kgfq6g/bK1hx848w5ic7phe6CoF1WvzOZAUpp12PgZq5ffu/ChnXuC2Av88a6Lnj18woxuw8EHVbwjogSITz/kgJPyt99z4XOV0MXpdNYuv3fhnw4d3zQ1MKk3Rr63LzBVMw4b30j3tC+846VOD/faA8TAj5RUv2BNaqKI9xT7fhiVL6xf/4XiYOp0X1z9Fbv1LSudl7Sof9CalAWgMWso45jt75pq575vV54gn5/lSxb8W++jK6ytSnh1RWZzqAmwLH1UNlUBjtJCYYEHsszbXvMx58NVlpMp53uLxiSzDVObP1Mo5Fx9/SeDf1EFyHI+P0tmHDd7IqCfjYEXYE2KRaJlK7qX/mkowDXaSpBBxqxet3gDcfFUFffHwFZbKFTUCdQnCeaXTbVzPzFICWhn9YKqQ6vmeV+8y3Iq6XyxaE2yqS/Vew0qootjoLfysdm94qL3i/rHiUzS+2Jk1Hy7cdLcs9vbr4leKsp4rxQgnQYDUN9nPmNNcnxs/cxeXC8bcykAqsuvecmQbr7UJ7Cy46pno7HPnuF99JPAVlsCq0BE1ClT4prGmuZLCoWcy2azO6Z5/XiA2X5EJHqG2SSc6wmNSX2kofbieZXx/QM1A3VyNoA+BZGo82zNT5te33zqS1U3oL19bf0xzfubQNYSmUNUvLM2FTgp/k9bZ8uFL5+O2SwDOQWgTTXNC9kE870vqkKFQLAmZbxES1s7F8/dGWvY389QM+c9zIkbvEQRoMQcWCf+Pau7ltxUSXrYn2LWzvmgocR13ochMQcAPweJTm3tvvyBff3MeM+tP2sAqAn0HGtSAy1bEm5hb5cCSnmseZk0RMQl5QwyprVrySXOR59ntmBio6qIfJ8znJjTWDvvh8CsEls4QNaUO4Vau5be6CVaYk0qgKqoejXEP2maNndqOeRUhE06l/7ce5e1tioh6kMCxoHsjTOmzj4qFn7G/At4AKVMZhZvfOB1q5iDE8SHobVVCefDK9u6lsx+qWL/ADiN07R8ftbgdvEBvn7q/H9nxc8UWi3iPAANbLV1Et3IB/ads3LlVb07cPelekEeGx88+nZDiVOd7wuNSSREZa0PdUb7hsVbBsf9YT1BzdyfWJP6cOR6itYkk6ruAdtDp97998Wbh6atX2IPEGs66SN/O+YkZnuC95EHceB9sYeAqwFQ/iWL/VmOP3+WLymgDrJm7bfCtYt+69T/G0CPW5MwABC5HmfZvkefS91WP+Wig2IM0Z/vaz6/RvP5vJfInSvqNjHbwPswMhxMNQn9CUCayeR5OMMqFBb4LLI83vf+l5O+e6yJwSVTcFxUhV+ePumCUkOK0sszBGRKeu71Y0wWIDhrkqSKZa1dSx6JLSW3z3PbGETlBIA2Tm3+eFPN/C+VLWkwwCorwequluXGRWmB/K2UJiJyvY7JnGI5eUfZJQ+8Nq4XrH7oykdB8p9xFxGxd72R5dS7G2vmLi6lj8NmBjkAt62/uugRZrz6RwwHycj3FY1JvHWzqfpJDjmpRJleihBAAHR6XXa8uJ5uIp6g6oXYQpSbVnUtbM8gw/u27DmoFjC5+XgyfDmTeRsRw/vwL+rpM23rF3UMvm9w/aKhdt4EVrreGPu2eEYBsCZpVeURh/Ddqzu3H04dcOFzvmpN1Zed64kAImOS1knxw6u6lv5soLF1+PrJiZMuOsHY5F2AVMVAujrhpO/qts6Wz+9skvkl9QD92u173mlMcoKqD9kkWcXfvapr4eossrQvhR+Ho5zEhaB5F5OhFUz8Nuf7fOR6HLM5hayubKyZ+6nyfYMnhzPImFWdi59xY595l5Pop4GttkREzvc5EF5nENyxY69hoZDzGSwzbV1Lv+J93x+MTQUCgUgoTPZ7TbWz6wsYHhSWh1VWr7/yPkH0kbjFjYyLPcoFTTVzvlT6XPOyCQGnFiAxrUeZfpdABADfB4A70/t21iCPvK+vvfDQptr5N1oTLFX1VXGjKBkiss4XPVT2Myb5naba+cvqay85NI+8L+/9yZfKs+3t17i2zsUf8T5aZE2VYTLW+8gDOJiM/f2JNc3vLhRyLpMpLZOIMxwSIx8VcY8ZDqxXLwRUAcGyEoaQ4Uq/ZcVa1Xn5b0SiudakDAA43+uYk19rmDLnv0aTI6A9cf/xfBx3EehAgCCQpyTimvYNS54v37MvhB+PfTefTMw/JjZHO9fniGgnBRZVBcSaKqMSPerhz1/VufTm7ZG2UgazOI+8b5za/HFSvlLV76cqymwMwA4iH2vtXvLT8uvKZd+mmuZTicztog5QFWOSgUj4h9auqndm0EFDD65u/3saapu/E3DyU5HriYiYiQx5de9d3bX0xtEYR+c9cf/OmlMNJw8UldCYBJjohvYNS54vW8dop64ZZOJUrrb5XDDfDqAsfLtzpSYikPGuN1LokUm7301NNc0Lt8/3F5QFBTDaAX2OiIgIrOIjqLdBYuxPGibP/USZ2StV9Gxr15I7RaP51iSNQsn5PmdM6u2NU3pb8sj7NIZ34XFYyZjXHVv/WeeLf7QmFaiKAEKWzM8bai+eUcnk0qgqwMSJ8fwdMd4Jild0iHiomuuxb8qahBLGaKxt/orh4FpVn/AaSUn4u2YtVB1zEBAYzvX+hBn5OM2K282BnNTXf9JOr533NfJ8H4CjRLwAgDGpQMm84Py2xQr+E4B+ZRkYFVu61Pm+X1tb1Z9NGJOY3Ti5+dwCKhKc5lGn+fwszyY8RzTqNJwIRLxToJphf9tQO29KJdhitEIAAdDTJ12QfNak1hCZ1wOAqDw0wR8+7ba46jeK7r+cE5M21jR/y5rk+ZHv9QRlgIb4HSoxqq9i8VGHKl/c2r3w1h3d/vSa5mMB/i6bYIbzvYqSwoAIKvg5q351Rfeizl1/twV0/FHYP5nqa2Pmyd5HjokZZEIvesrq7sWrKmkKLY+710+ZX2sJy0EyTsRHxiQCiKzTgN7c+rdFT40UUbQbHiBLAPBMYr+pIDpaxDnDAUhx823rv1AsMW+jKPwFBMzixprm661Jnh+5nnK3MQ1h9Z7IMnOCvbr/TpotTa3dC2/NIGNiqyfNI++baud+QomWE/OMyG0LAZC11QGAv6rHu1q7Fv7Hiu5FnTurGJaVMoMOun9j7jmF/IcCfUSGREUJSDFj2YzjZk+sBBTmSlxDe/eiTqXoHIDjApsvOmI7WSO54bjjZo+J09m97y2s+A1KlT+wk5mGk0yAinoo9KY4p8mPXszP5BnISeOUo6+1JvkB53qjSlx+CVE/KurPbF276IuFjm9vzSBjNqXrqFDIubq688dOr533Q8PJa1RlrPN9oTWpBJHpE4myyd7EjLLCAFkuATAdKqVb1bV0tXi5yJqUKU0tOUP2db5or8sgw8M3lpZ6EZC1bZ2X/wHenW9M0oAYzvc6w4mmqjD4ObCAKnmv4a6KY0njxonUgQ49/OCTLmTwsYAYVf94MSXznnpqRdSBUelvo3Q6a2655XO+ccqc/7G26hPO9UYgBEOKHiTxOLm/lXzxrNbuy0tTQnfqwek1HI+pz35DSsfcbDhxunO9IUg5sNVW1N1D8JmVnUuu3/h8wQ247Z12/lAWWUb6VNPY+Fm65ZbPeQB44pl7Vh86vnF/w4mZClERJ4GtmvTsuDEH/PGZ799aSRdQ/7DJvQtXHTZ+ZlVgUqeIOBF1Yk1q6iHji0f88Zlrbhh++mlkMEC8lSudtb3/6HmQiGuZAngf/qytu+XDozXwMKgM+yVjqr4WuR43lOXH5V0mwwlScUtWdi2eD0BLhSkBMgzkfWPN3LOZzPdBdICXsM9wIgXVSAlffe3a9YvK1rwTBo6yyNKdafDEQofu7DefVNf82tBRnWE9WVTnAcrlcGRtyka+eN7qrqU/qIQpxI7DJiaZcSWmMjDV1vntV96NogLEgOPEY+cdw6F0KCRhOUVOw/9c1dly7Wjkp+UHNH3y3I+STfzIS9GVPBbt3O5FmAMmUCQqn27rWvKD7WPkVwVQNNXO+zIRf1XUASKhtVUJL+5BA/3U8s7FK8qZxgDAynI6DZ44saO0SXTQdzwqm4rGRLVetAGi00H6JoVOZrZjYhq6OPh2DyVPbCLy/q0r17W0VbbfKMY/04/YkpQxiT8btk3OFx2IEJikda7vc23dl3+rtD0tGhUMkME0AgAb6jTDQZIAeAmLYuTuOBXCiBZ+Mpll8Vh5zZy3wNjveQk9oEMIX73hBAP0nEDPbOta8oNyapctFXHq6z8RNNXMu9Zw4qvioyjuWk4lxEffe4Gfn7m8c/GKwWxb/GclICeFQs7l83k/adL/JJtq59U31cz7fFNtc74v1dfhxN9n2F7DJvg4sXkjAWO8RN67YqSqTlV9zEQYw8YmApMao4Zvmj75ksNzyFUA5MotZVf1soTvF/F/NxxYqJLzoWdOfPPE2rnv29O2sopesCm9hlAAFDieQCAypKodZ64Z83A7QCNb+ctyPj/LN06ZfTSRuV4hgUKEdoH2VdUbExhVekI0OmtV19LV9fWfDAqFXJTBMpPDLF8/5aKD7LbE9cYkTotcT5/hREpVtqq6z63sWnxtWeATJ07T2OOTlHYFYsbUS4/y3p9CRKcpnjgJwCRjElBVCBygHpHrdYQyRQ4mYstsDHGssyIhoPqYqH+gKNuWW9jViepgW3x7JWuuSsTTuqser6+d816r9i/MplrEi8CJJfOzhsmz31Eo5P6yu964IgWYWIgJIIW+ARAwWXiNVpRm6EfS/VMGHbTpqGyqj3t/wWQmOil6ApldW35goHgM3r191bqla0vfJ0qnszZfmOViRQpuYrLTIt/TF9iqlPfR31T0w63rltxfV5dNHHwwZPBvOLl23pRI6Z2Anuklmm5MYizitAeyo8CJDDNbIgsmA1WNvSOkm7zcS6CVIFpl4LuXdy19YafQpYJrEC65t3HKnA8zB78hUihEFZxik/hV0+S5pxQKubW7g8lspR8OKEGbp4hK/ENB94wC6DP5Qs41Jud+03KqYSjQpypiOGEUeIIF/7ZyXUtnWRkH6gQXH0cc3ASi13rfFwa2OuUlzLtIP9G+YcnzpftCAJg++ZLDwfJuJWRCkZOtTSbijaUC5/s8gUoWrhRbeCxwUQ8vbgupW+MhKwlYwYbve0cmuSGX29EzlvBEDCB3Vh8gIEtZAB3oIGQy2LRpDe2IOwrdud821syZG5jqlsj3SGny6SA15sb62ktOyXcufLJSoqgCEBgvZT752HnjwtB3EZmDVSWySBy7vOvrXSPFSJWbIZumzPkA2+T1g7j9naJ9JsNQ3qwib2lbt+T+MmgcKKrMm8HgGwhysIj3bBJGxeVau5YsGPxeM6bMP82z/icUZ1gOxikEXkKUNpJpKQxbIhv3b0IRdz7xA0J6F8B/MZ7vi5dFvrhUvSldR6cWILlSU+pgBnJTuo7KHnZPsqjGmjlfZQouEQ1JFWJNyoq4tv2TE976xwfmbKuEmaVKYnJ5ly+J/pXJWq9+3TZT9YaOjlw4MvRv3KjReGzz4RTSX0EYF2Mn4p3ZPsBKZCJE4emtD11x546WX1/zxbcElPqtwu8XM4XUR4r/Wtm1+GcAUFeXHbufj84myKdAPJ2IIRJCVNxA+QiGKSBmCxEHhd+g4L+w+ttFZfngbeKDU7aJE6f1r54ZeC5ZzmSm0aZNa2io5o6ZNXP28+AJRGa8IDyIEIyHyDiF7gfIfiCqBrGFwgKaICKvqh8GMCYehFVnTZUVCW92W1IfOPNJ9G2veHsQAuJyJqAerzVsLRGD1D3Y0ZELRyr/z2Aa5UFC4dyrmYMJzvf5Ull3ZzrrDQfWifv4qp0I/8TJF77NUvIGUZ9kMgTgH079+1d3tSw//qgvHJhKVZ0L3/dZ5sQUBSASqgr6Gz+ZrTEcQMRBVNaKRLeQ6s207TWtrY/N7n2RwAsdmkd8ysj2WCjL6TRMLPCcDCZKT540/+DQ+tdDqY4UU0GYpNCjHOE1qjqO4auYEiAwYO2LrVQHJOq1b3DN0zrpdYGpOpMO6GnIPbm0MJyMhlWATek6QgEwzEcSxS1qBNw3+P/tnfAzseuvaX4/c/DvQwlfVV1gq63zxa+t6lpy3Yss//WzT7UmuEFUEvEiKr9Wiz1vWf3wN56aXjf/U+J1tjHBZJEIzvd6EJWDujWcKCH26FHvwxuYbb6qM7F8MFkz0Gm8Rsvp4faONI7x8d/npJweN9U0vw6k00X1JIBPLMJPYfB45iD+CqpQCFQFiP+toiJxGwMQhyLdKWDUHZ4VgVTER6pCIwYC45qaHAljoerhwfcPzg72psiTxwI97rjZY6SoS0mdlpZF7xTxW5uyzvfd0tbV8pU0YqFnsMzkC7Nc46S509maG0R90pqUEQ3/iK0PncX7TWmYXjv/dwRTz+QQuZLg44dljE1BJISK/6MQfugj3FJqbOnnA8qgbVdt7llkuQMdlEfOl4U+Y2rzCQI+Q0XfoZATDAVjmAgaL8CGiHNCcTs6gQiqrLF1MQFEIAPi+GHQAOXf/3gGZcXbPzI1zAlIFJkRUYCykIn5UBBBxBWJTFecHdTp3ll/XIqt6mu+wNjE0ZHr3YX1qzBb9uIeN1HVxwBQAZCy9zixdv4bCHSjqt/PmhR5H/6Yo2iOjJ1yJQGfBhGc6ytvIgeBjLUpeB9tE4muJzbXrOxY2LadpefzyCMvQ6W42dKy6jKbd1Jd82ud2LOhLuNFTzRsrJKHKuAlRIlDQcnb2DLI1TK0gSJeKSMoEUiRKiJAiiAqQhApIQQohKoDISJV7wFX8kN9RPDiJVB1/wSAumFkRJW56LxvnDLnxsBWvzv0vQ+bca+ZtnLl7N69A4AxuKyvveRQo+5+Ah2o8GZnwE8VMdnj3btau1tujTOG2A3HO32oQESvBTFU/dUi7hbDiW8x22Mi3yNlRo2gbDhFIm4rEf8/cPDNlR259YOB2g6DJEPWRvrReO0l0wn+AigyQTA2gEps5epjgapEgG4F0WaAniWRZ5T5GQD/FJFnmM2zRPQcxG3xHs+TCbaBXS/5oCfJ2hdxbzGJYljcP+mjqNad2f6Ez40Q+TasB+hvkwIOKrmdh2Ph7905enGshATqzzZ2zMFeilBRqIojApcVQVV9YKuMl+I1rd0tt8YEzxoBcjK97ovj1eNmZvNaL94T/Pch6DMmcStUEfMIMKqQmC0UVfU/NLBLlnd+vSu29oyJF0hvD9SGi10lwZ/B0HlE5mRVhah/JIy2rAP4EQCPMGij9/4xQ8lNgfp/mijxQmFjrm9vhdb+IgMui2HBIIMeGv1X6gEGqoBP9d0bmKpjne+5prWz5VMjNMRIM2vmjPVs3kyC8wT6TmsSVV4ixCPcEGbDUHoiSOC4ux9MPg90UAbAmro6M8b33mpN8q1ewl5SugOk+xtOvtn5XgVUVaFEbIxJwkt0N7HOb+2Ij4mJK4SxF9m94pmioW7Oa9gHH2K2b1Bx6wRuhbjE+oNoy6bb1l9drMT7ZdBBZR6gP9xOnKbI5xEfWlm+FuguRKX7xAMAwNZuJMz+MqbkjtcNrg/sbatPiR69BcAtDbXzpnjvPwTohyynXq8QZjIQH827+8HFm+NiRx3yhZxr8HN/EJjUW53viwj0BKD1TPaQyPd4ArEq1JqkUfVb1LsvtXUt/iYALYePPZxbjHFaeEGPYsz3VnTltuxUuKWcvyzQGCst0JIQY28DoLLnl8NoXnZ4T0cIxm1JiTf7qXoQYUO/to4Y/5/hOtRprjPXDSBbf2h2id0/eicxPut8Udq6llyXRZJv3voktbdfEzXUzL00MKlz49XxMAocTWTYS7F0vAwQh43oz/Dy2dZ1LWtL7NuIjF63rb96y2CmL84S6krkz65CyegKcpQUYAEBUAmDarBWe3EAeGMMDkasBWwQDdqfR/fgSfwKwK+mT/9iFUB6Zzpr2gvXRA2TL36v4eDrzve6UpGISrUBVYUyW1PKhRe0dia/hv6CFbk8MJJNK/EEVAH/0hdV2ghCoe8CEBlxk1euu+rxUT5MmTKZZVxG5AOHQs+uY5tYofBjY6JjIBmOadCkFZXHSfS/VnYvvq2CFbH/56+KGkJSUdIyGUvA08nw2WcqLiPsjVcojXZnkeU86vS442aPgQ2uB9H+IqI7Cj+wVVbU38UUnrSye/Ft5a7fV4U/AgoQcmiJGKp4urDx2j7so/EvoDxrmJOqovlfy8Gx3odugCxSBeCtrbLeu2tf4OTbVqy9YmMms8y80k75fokwwOBYYUCIniiBn30y/l1q5nQNk+d+wpjkR+JF0OUSsSpAajhpxEdfbe1anI0VM+4oqoSGLh0Vt3MGdLuUrLK1rmVQOPg9Kv0uu/v+8fq5vQ/BlSlACFAAEJmnSt8EyI+u8LPIci4/yzfWza4j4f92viiDLT8e/jXkNbygravlmzFOWCYoNW5UoNJaKKBCL5EbBFB3/eD3HBRWJMgdQGdu33kAIqNxvSJ6CgA2baob7TlA6sh0UP2G7wbYuv6HzKbaqfMUs4Ma07r8AiQ6v61r6c9idjBXoUWU1sJP/dJkBt7sNPSsMZ5QJk9eVUHEoCIQbWGb+Aeb/Tbe/eD8zeU+wYE284HdQwB0Ru28M8HmYC/Ok5IhaDEauzk/RLcuAdDGKZcevdXax0v9Fbt0E9OnzDtdrTmUlcghbF21tmXNLhpyKg7RFSkAk1cogck+tS/iUjqdNfl8zjXUHP0Va6oat28NU2UKWCR6sq378p9lkDH53digUaagVfxbTWLsd9QJiA2gCuYAbEw/A6LqEPleQJ57oqmm+W8Evjki+mU+P+vJwcpU7t0X1dMSXH2h6jYQMZgt/FZ9BsAfSlmN3xnPAnLfGxu52QDu34lACYA2vWH+ayTyv7FIpJQUBrYpdsZxv8aesoQVgUC16uIKFTaPMAm00zhXKORcQ80lJxoy81/cH0DsJRRjq2qaaueeU1rktNszcgQpOtfrvSuGzvU6kcg73/P70G25uhi98L+h2/Ij57atJCgsJw4jNm9nY79hIQ9Mr52XnTTpgmR5vLxcAla13yhGz/eIRM75vqKI8wT9eCyQ/ItCHEA6vab52MBWnUasZ5YVdEdjiMOwe7/hIOUlct4X/7SyY2FbtnQw1/beDXTi5HnHNEy++I2D/m4vFcCrE/VwKs+OMAm0U16ivv6TAZP7DogChb445yTWuK6uF+75PkIiIjIoLZRgDgyLfKe1s+XzbV1Lzm/rbPlYa9fSGSzc6Hx4C0CIXG8IlYOYEwsm2LF3NE6ae8TgAZK27sseVtCfDScNACMaGoDe1Thp7hHxUMmAMDoy8ayFEs4lkKrqB+vqsolSy1j/FWMOkBLOVRVlYkugnw5kSIONZxoBUDZyPnM8vV2aH9w7BTCQUFWKbMzmUUX9pezCbj3g84aT9d6HnnYyv0iA8RKK4aCpYcrct5a3d+299vHYdDprM5llidKyC1rRvXhVW9eSM1T91dakEqLineuNDNuZMLj1+KOyB8ZK+6SJwyX/IEb1yiLirEmOJUMf2MG6KZ+f5evqsmNF5ZzI94BNMG2sFE8tZz+DvURDzZx6Im5QCHkJnw4SdEOsHNspC+UxS449dt44An0CpFtGIATElSjZ5voAej5g7o3Rbt0ohIAs57FMTnz9pUeC+CtOihKXhXdZptC4aozZADASO4mF+ucDfGkMTDPImCyy3Nq5+PNeooI1SQPSeJGTqXpDItVzOZCTY455mwCAG5O4zUm4kTlgABD1EOi5g2YN+936WF98p+XkESo+IjCgsl24KHsJUjqXKWAmCyL6zd0PLt684zaW8ubWqlDOC8yY/SHUOwIKEHuPLfsXQ0CfK7q+vtGz/g4CSNlEXzWc2F93YPt24sCNlz5hMm+fXjvnTTnkNDMKK1bzyPs7S89JiearSqlVnKzzvZ7B/3nS1LnTShadaG/P9TBwneF4gNlLKIbMccWnek5CaVD11P5ROvefJT6DRENAccb0yZccHitfxuTzs/zMmjn7AXi/aARRr15xbemLbfc4CoUFpXv1Aq+Rilbm3Su66eBtBzsAm+GCnsGeYSSBXx55aai75I1E/GHn+2TXXcGDnIBC4uZPuhDxMuBRueLGUKVVnYtXenV/ZUqwQlVV1JiEiRRnA0AYPkslV/IT78OIiAwUpR2K+BgAbNhwO+fiZpZJIHOalxAgWBHx1ibHeuPicHFUdQAAnugMY4LDAFJVue+MrqqVMe4ZAH+x9ZM64nMNJ18rEoHZjYgClM7HRQjFU5zy4ajUATKZ2MC8+wqztVrqhq0Axhnn+1RBmZmTLn59Pj/8Bo49T00XGADKoOXMBlAIQKQqUNEGADhh/T9cFlluXdeyViF3xr1/iGcDQWfNOCY7sb39GgcA6oIPWk4koRr38xFI1AOq52awzEzc2BMBgIr+p6oqkyUofhKP423HYFKhsMCnj8qmoHqhqFMiImYrI+UBCMgJkX00GQZ+5F1/7OpOrJk7k8ic5aVPiIhLPP/wFJqqtyaRigx/Nnax00a3SqX4+6BPJ4WCQK/pDxcloEdEPygtUCQR761JHii2eDYATD/ii1UKfMhLBGITxIOvxF5CNWSPf7T2vpPzyEv9lPm1ID5V4cn78AVLuiwGf5Adrb9YVfyA4cQkQCDiNpDIfRi0zGovFCCWAxvzWNLuN+KVtbhrVYlVlzIxa5z3EZGlSr2Al1AJ9NEZx8yeGDN0o3cun/IAfUw7eYqltA1G9XfOFx9ntgb963TceQDUjwlOYWNqAKhA2gX6GJEBKTlmC6/+PABq4D9kOEgyGYD01uVdS5+Iwd8AUVQoLPD19Z8MRORiUaeGkwTlby7vWvpCGRjuNQYAAK/R48WeLbK7TNPQ1r/M5JCTpinzZxmbnFna8MkgUoW/CIrNpURgqM8rWVhivE8E5wHQ9OhtKyVSOnjANEgpbhP85wDpQprJLDPLu5a+QETXl8GgSKhsEm86seZLNax4H8GAyRJEv8TE11tOxs85jrJnvLn2kkMBOkvUQQGwmh/GOpfZrlgGkCa2TjjLmOANgJL3xYeP6t7wjZ2kiXunAHD+kTCxbYQ7atbo6ZMuSCr5BSpeCfDWpIgUP23rXHoViH/PJoDGIzNDSAXsJVKofCZdlx1b+uEjGgpKyF0BfUP/wI6qxtNSuH9wnl9OSUnkx07i8rWWilSsYYsS3gEonBSfqj50zO0K/ZXXEEpq4/MWaXxR3HdAfjKBID7q3mKTd8Qc3MC5i3FTa5Y93FxVAcF4Ad3xaO3k448//gsHDnDNe6UA8euTJli/NTF+xNLA2D3lZLOp+g9rUrUikSM21vviMwY6D8gySP9HxMmupoUGU4MiTqxJHlmUvnNiLzCSC5bjAZD0lIsOAnCSaITSyWgs6mCAG4GBIZoccpJFllu7L38AIncbThA0BoPE/B5VOTJ2dLSsUMi5qtdUrRbx9xpOUIx9ROP7EDBbEPHPOzpy4WCXHlt/TpqmRO8wnGiIT0ODsWzPC4Ix7cli0Fgm1/bWAygA3NW58MlhqlW7Zf2FQs6fPumCpCqaRZwCgOEECyi3vGvpE/X1T5q2zpaVov5Ow0kur1oZyg2IOhWVC+vrvxtU4v4qDlV1sEBOemA/Y01ynIj3qvCWU+y9u3NFV8uKHXn5fprWmB/EdIaWnIYTIsBLJFb1xyVX7Qh8bbxgIr4xvo/Y+WIoRNcN8kIY7GWUonmqqszGiLg7xbvvRNHWH4jSxgGMNRIhYESzvmUMQJ8zqbONTdSIRI45CJzrW7PNpL6bRZbHjj20RLiYq0p6SMP4KeN9qIYT03jLhjPLpMtuInzOIssbNmzm8jLJNLI235ELp0+e28hsmr0vSlw5ZiPqixTwhQC0YwfOvayA+xf1Ru/Df8QLp6EKUuYEi/pVy7ta2suA1RHnvS9u6b9PoaU08o5VnYu7By+UymRi7FRf03wqkz1F1EEVzxarqt7b2r3kMys7F523umtpV9kbvewUIJ/PSBZZFuAL5fBOzADwpY6OXNiBaRRTskrVr0ne5iV6wJgk6bBdvVxKWeSiPaGHDaE3h5y0t38qyiPvC4WcKyDnGmrnnamGbwakWlQcs7VEBp7cR9vWLLl/FyPYmsksM7dvWPK8Qn/JnIjn/VTBZMBqfgyQptPgTCZj2jsXPqmKmwwFGPB2RMT8ox0LP+XfZSDNAKEUOr53//25506fdEGypPgVYSB+Caw/zmlqetLMQYP4KDImEXgXLm/rbrkhdqWzfJl8KRRyTpWuZjI0HDVABOOkKIbtyQ1Tm0/JlVa671pZVAgQAkRVxBNNapoy/7jptZe8acaUeQ2Ntc3nNtU0/4ahN6rKwapKga1OEOhRgbx79dqlv4gHTXbRHleqmhoKfigSCgjMxOx93/NI0K9ejNTpB1Ly8syGvQ+fMOJvGXxfBhmTQ04aauacSGTeJuq8SLgFHt8EQLetHx8NnJX0MlSAurp+q/w0lRp8FASF+RpA2jGIyCmj+YDkF5Hve4zZcnn589BFIgMWjb1A3S5iIGnAnGAiG7BJBCBlIrOYDd9PRO0wti1hxlwb2DH/Xt4UAqLHxbvFfQ71bZ1LfleeTh6qjqBQWtm58F4VWWk4wcwJUtBNrX+Lj7EHUN4/SH6/zXd5cR3M1hpKEID88q6lLwzew1yXrYt5EuCrlpM2MNVGCde2rW95bE/OatrHCpDlXC4nJx3T/FoCneF9UdgkApFoxaruxb/PvrihU9PprFnetfQFVrrGcECqkOGJoaKC6IzpNc3H5nLbF4nKzSwqtEm8+6uqrBbx94rIvSLuXl/6RzRsD90Ld4du269FohYVOauqN/WGlV0L5/91/aKnK92OcmqJtiXi70HJi7hQVX+0o4tOp7Omvf2aiIn/H1PgvUQ9zPpjbHf6avz8mmqajyIyEyLfd6+XYivEX4U9PKltnx5VWm7HigKdZU1yjHO9IYESROZyANqRmcY7NpuWaE9ybL+vPpzNxPtrHAuG3BJuTcJ6V7wQwHmDm1jLCtbWvfAGADfsSQjL5zOSB1WUZZTb093YzT9LvDBhpWfIqq7q9RiYfdjuvmfctm9NSB5wq4lMuHz94odKQK4k2Ni6U4ekHisUck0v/rTcbivAPj67XgnZBdTw8942w6Y+rqj5rq2m+viOjly0q7hVPoSysab529YkPrN9e/iuPogAUE/Idtp9ay/7+/brXyt/PhlkeFO6juIW74yM4jTUXqXVe8rO8r50/wDp9F/0vJGZTvASecMBQem7g0gODAGmCJ6/2V9mHeaBiIo3JjEmkOgze1Ek0nI2EFsrjcA2tGHrFFThfS8u2LycFaBMk4ri3w0nuHQ022bj/HXD8dZ55H02m6W29Ys6BPo7w0kajhgqF4lAOK+hdt6EEoVKL62h5qQCL6QV3jci1z5TgEIhFx/VpnSGlwiGkwzFb1dsuGJTJYdNdeQ6Sk2U+t8Kv+NmpF0VicRy8iBS+djI08OvjGsfKUCWAeitdWEtCMepunhbFuNaAFTJlFH5rL/VnUv/It4tN5zk4Yghik/sUALOrz80W13usH1V7PtYAfrLs5G+1XDCEhmIurU65vnlZeFW8j4ljkANmf+Oy7BSUZHImMTRwQG9mZh5e9UL7HMFKBcxiPU0LW0bB/GvSzvuKxZIOY4/7bfd6DXsKlGgMhw9KCrqVb8Yd+Yu8K+Kfd8qAOWQk3RddqxAGkqLEkVVfgvs9rJJTaezZv36q4uk+DaxpVL1bChIbbwvquXE8T1PFU8veQH7quj3ERGURZZyyOlW9NZZ8GEAQUXWVRer/5ZG1m7CwCBEJdeGDbdTOp21zz8e/jypfV9hNhNUvex8sXS/GsRKIn42gJtPLUAKr8p+3yjAnWkwChAj1MBsCSB4hPnt9uXt3qRZ2YU/3VTbfLnhxKLI9Q45REJEpSJRkJ5RM3dmriu3fLQOunpVAXa4+gdJVRrKTRtEGNM0dd4HiGBFdv+8IVbPSuRV4Z0PfSUzBFAoGcPe+YsALK/L1uk+WtxFQJYy6KB42URlCxx3N8sqzwCWN5fvxpfbFw8A2jRlzmoyQb2X0BsKTCUyG/4SeNmtg7KUwBFE39i6rqVzdDedKGUy+Z1uK9nJfoE9usoU+U5/Zv9OwpfUA8SrTxpq501Q8UdDPQjEopFoqQ1s71RLiYaM/Tt8G1VvbSIRafgFAJ9GJjNKk85ZBkjyefhJky5ITkzsNzVy4SHWJHuU7N/y+VnPDty3R4wfYaCYRE21894E4onkRZn8w8u7qOtl4QHKbUwzpjafIIL2QVuwR97N0NDnCA9oJEGVtkK0rm19y+N7WCQa9jefUPPZwxK838UQfBQEUdUuAm8mojGAPpjkxKWFjtzW3V+3N3D/jNpLP6uED6n6taxYq6AEmOoJNE7Efby1a8kjw51NOKoeoCPTQcgDono0c0BOimJtytIo6F18zs+wRB+Jigts1X7OFT8F4MvxqR4jde5h/LCbpjSfTGx/bjhxRKS9V3jwFe1dC58EgOOP/8KBqWLV/D7Xt3pmzZy3Lu+iJ3bDExAAzKxZsp/Sll8o4S3icUZb9+I7Bt80vfaSrEBrADzSMcx+gFFVgPIuIQUdFU++oM9L2ALg+dha9/65azx/JVB8jsgeI+p0qLAQzxCEqqSfOPnYeVcWCrnnMAJr72JLW6DT64qTxOsNlu34yG37dFtXy3fLypEFkLs/9xyA5qaaOQkHumv6EVe8YeVjW4qVfIc4pV6ACH0/T9n939lbfPb9q9ddcUd9/XeDY44ZJ6UzidzKzoW5NGKuYziMs28IEY8j2BiAaGNbZ8uoYO+GKXO2WhN8T5yTYZwAi3gf2KrXRGH0EQDfGJGzD7MAcqTim7+eCMaOD6MXbm/ravlufKTroR7ISW4QYr/P982bYKrvPzBlK6r8ZTLLTC4/yzfWzvtgwow5oy96ruPodU03HI2Mybd/yrW3D1aeLFdwLvHoK8DEiSWWj2kiiAGi9RlkzJq6OnPwwSPjdrdufZIAoLq3+vpe3/sVZnuEqhuSGCICiThV+AvSR330mkJhQRHI7dXhF7lcTk6cdumRGoVnlGYVfwaA4vb2wQIubQpfD78e+FGln9DfFib6URgSIm7NY5bPYJkB8jt878oxzagqQF2+3JDpJ5Q2Oq/LI+/TB2dpJDd5ptNZW2jPbW2saf6O4eCyyDk/5HYREHuJvLWpScXUxPcD9LNdp1QVpGOlTV0U+WnGBGO9LyoLOgDoEKwjZbCMK9xeTjnkpL4+W63beqYoPEPlMWDv1/aPai1goJcN+ysUpHhoND6n3DdoIvd954uby8MVw6UN8elcdGHcjLoXK2bi/QYgkrEEUoWKkumLn8Gu4cvurq43z8NCEZTQ4IhMaY12Maj8UANVASk/uR07OHKqJpnMMl6x4YpNBPzIcGL4jqHyJJEJTrylJvq3vVo0VeISSOkfqp6YjAHJeJTOQh4C0dPuPMej1ndsI9DT8TFyPGEk0vh91RFEqgKB/HPwAxvJq2TBZLx8y/liX4ke1soUNNqrRVPlJQwqqQe8+scsVwmAkwHohvpxvPNcHrtFCafTWZtH3oNwB5EhgdSVQ8wu3v/lMBmkVGbgVAUWwQvA8AOLe+4FMrx8/eUPAfpLYyrtGywKkzltxpR5DXuxaEozyJi29bktBP7f0oaTjzVOumD/9vZrovr6TwbZUqNnff13g5gdvWhKU23zHaUlUMOScmWuwlBwdRht3WrIntw4ae4ROSzQUspHscfJmBJR9NJPBmVLp1gRYRugcKrhMHFxL91ACeG54CqR4YBgmR6GMlt25C8CoKXJmz3yAllkebzvuSKMXvh9MnHAMWTGXDf9iC9WtbdfE+VKjZ7t7Z+Kpk/+4uGswR+h+tflXdXbyi1zwyl4FllesfayjQp83JqqagT8DYC0lPIpSl3MDUddfEjT1DmTB+jml4gKLpdcm2rn5JmSZwswpXXt19eN1InjQ1GxjTVzbjGcfOfQ5xAPhAEiDgXRcas6r1xX6mHYY46+/tBstT2geJXhxCedFDeR0DcVeg8MR6x0MgEfF9WftXYtWrD7JFTGAHnfVDPnPcTJ/4VKmxNZSIwNNoyMBskmkF4l0PPbOhf/Ybiy9+iGgBI6FqWniAjgcNSJp/JsIYu5Ml7kNXz3sKp6w4kk1FyAeEJpTw1DAVD7k7me1s7Fnwq1+CZW/qkS3g7o1yGYp4SDVf37WrsWLchWZPkv8jUeyJjWrqU3SvT8VAAFy/wZBi7TIPi6kpxFinlVnck7UF4x/9JRwWvKBxs+DGJoSIl+0my0okB+lgeyvHId7mis6Wk1nGj0Eu105ex2WMAXlUAfbqi7+LJ8ftZTe+GlSmNrWVq9NncfSgdt78w75rCnSyzyPoOMycenl/33YO/zssoCyv1+DKyL61eyPwAMV6DYe8czLV5tx+YqAhNUvUJ9DEZ3+o8IJDScOACeR2LRlJZjdjqdtbGlK6H033jRlu89whw+PvWk/P7l1TEZsztAdpQbQgYfzqDdXsP/aOtc+vO9Yd0q/12KSZM+nxhvqtYEdszrRaIhfm6ZsTaIfN9WCnhS698WPTXKJ6O9LK5RjskxE5iaaB7u/UfPc6Q0afvQMKoEFK1ff3WxqfbLH1CVYwXekQ7dPBJpBMOB9X1hgFevkcsEAKCpZu7vG6c0/yr+u2WvDmf83/AAwKZ0HaEAKOEmQL8Qx69Z+/Asv/iwp0rp51JNveIVK69eFbKBjZPmHtFY0/yPE6bOPqoSguLVa99c+0AIpNlsltvWtzwG6H0Jb98FgEZxneur18tLAQZGu0n4aiWciV0WMV69XrFXKVelppq5v26oq+xEq1evV4gHGAwIGLicvT13gLB59fq/5gXQNGX+Z2bUXDrzVS/w0l8vgQVmub7+SRNsPWBWn7d/+Ov6RU9jH55G/ur1kitALOzpR3yxSqvN5Nd2N64p8QKvKsBLcP1/6Gb71CqxaDcAAAAASUVORK5CYII=";

const PARTNERS = [
  { name: 'Apex Manufacturing', icon: 'fa-industry' },
  { name: 'NovaTech Co.', icon: 'fa-laptop-code' },
  { name: 'Siam Food Group', icon: 'fa-utensils' },
  { name: 'ShopMax Online', icon: 'fa-cart-shopping' },
  { name: 'Swift Logistics', icon: 'fa-truck' },
  { name: 'GreenBuild Ltd.', icon: 'fa-building' },
];

export default function Home() {
  const { dict } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  
  // Contact Form State
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [service, setService] = useState(SERVICE_PLACEHOLDER);
  const [details, setDetails] = useState('');
  
  // Submission Status
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setCookieVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookieVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactInfo) {
      setStatus('error');
      setErrorMessage(dict.contact.form.requiredError);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          contactInfo,
          businessName,
          service:
            service === SERVICE_PLACEHOLDER
              ? dict.contact.form.serviceNotSelected
              : dict.contact.form.serviceOptions.find((opt) => opt.value === service)?.label ?? service,
          details,
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Reset form fields
        setFullName('');
        setContactInfo('');
        setBusinessName('');
        setService(SERVICE_PLACEHOLDER);
        setDetails('');
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.message || dict.contact.form.submitError);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      setErrorMessage(dict.contact.form.networkError);
    }
  };

  return (
    <>
      {/* NAV */}
      <header>
        <div className="wrap">
          <nav>
            <div className="brand">
              <img className="logo" src={LOGO_BASE64} alt="Adwaresource" />
              <div className="brandname">
                Adwaresource<small>ACCOUNTING · AUDIT · TAX</small>
              </div>
            </div>
            <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={dict.nav.openMenu}>
              <i className="fa-solid fa-bars" aria-hidden="true" />
            </button>
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <a href="#services" onClick={() => setMenuOpen(false)}>{dict.nav.services}</a>
              <a href="#why" onClick={() => setMenuOpen(false)}>{dict.nav.why}</a>
              <a href="#knowledge" onClick={() => setMenuOpen(false)}>{dict.nav.knowledge}</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>{dict.nav.about}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{dict.nav.contact}</a>
              <LanguageSwitcher />
              <a href="#contact" className="btn btn-line" onClick={() => setMenuOpen(false)}>
                <i className="fa-brands fa-line" aria-hidden="true" /> {dict.nav.lineCta}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <span className="pill">
            <i className="fa-solid fa-star icon-mr" aria-hidden="true" />
            {dict.hero.pill}
          </span>
          <h1>
            {dict.hero.title}
            <span>{dict.hero.titleHighlight}</span>
          </h1>
          <p>{dict.hero.subtitle}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              {dict.hero.ctaPrimary} <i className="fa-solid fa-arrow-right icon-ml" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              <i className="fa-brands fa-line" aria-hidden="true" /> {dict.hero.ctaLine}
            </a>
          </div>
          <div className="trust">
            <div><div className="num">{dict.hero.trust.clients}</div><div className="lbl">{dict.hero.trust.clientsLabel}</div></div>
            <div><div className="num">{dict.hero.trust.experience}</div><div className="lbl">{dict.hero.trust.experienceLabel}</div></div>
            <div><div className="num">{dict.hero.trust.services}</div><div className="lbl">{dict.hero.trust.servicesLabel}</div></div>
            <div><div className="num">{dict.hero.trust.ai}</div><div className="lbl">{dict.hero.trust.aiLabel}</div></div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="wrap">
          <div className="center" style={{ maxWidth: '660px' }}>
            <div className="eyebrow">{dict.services.eyebrow}</div>
            <h2 className="sec-title">{dict.services.title}</h2>
            <p className="sec-sub center">{dict.services.subtitle}</p>
          </div>
          <div className="grid">
            {dict.services.items.map((item, index) => (
              <div className="card" key={item.title}>
                <div className="ic"><i className={`fa-solid ${SERVICE_ICONS[index]}`} aria-hidden="true" /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="more">
                  {dict.services.more} <i className="fa-solid fa-arrow-right icon-ml" aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="why">
        <div className="wrap why-grid">
          {/* <div>
            <div className="eyebrow">ทำไมต้อง Adwaresource</div>
            <h2 className="sec-title">มาตรฐาน Big 4 · ราคาที่ SME ไหว</h2>
            <div className="feat" style={{ marginTop: '26px' }}>
              <div className="chk">✓</div>
              <div>
                <h4>ทีม Big 4 Alumni</h4>
                <p>ประสบการณ์ตรวจสอบและที่ปรึกษาระดับสากลกว่า 15 ปี</p>
              </div>
            </div>
            <div className="feat">
              <div className="chk">✓</div>
              <div>
                <h4>ครบวงจรในที่เดียว</h4>
                <p>บัญชี + สอบบัญชี + ภาษี + BOI ไม่ต้องประสานหลายเจ้า</p>
              </div>
            </div>
            <div className="feat">
              <div className="chk">✓</div>
              <div>
                <h4>ขับเคลื่อนด้วย AI</h4>
                <p>ลดงานเอกสารซ้ำซ้อน ทีมมีเวลาให้คำปรึกษาเชิงลึกมากขึ้น</p>
              </div>
            </div>
            <div className="feat">
              <div className="chk">✓</div>
              <div>
                <h4>พร้อมรับ TFRS for NPAEs 2568</h4>
                <p>อัปเดตมาตรฐานและกฎภาษีใหม่ให้คุณตลอดเวลา</p>
              </div>
            </div>
          </div> */}
          <div className="why-visual">
            <h3>{dict.why.title}</h3>
            <p style={{ color: '#e0dcf2', fontSize: '15px', paddingBottom: '8px' }}>{dict.why.subtitle}</p>
            <div className="badge-row">
              {dict.why.badges.map((badge) => (
                <span className="badge" key={badge}>
                  <i className="fa-solid fa-circle-check icon-mr" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: '54px 0' }}>
        <div className="wrap center" style={{ maxWidth: '760px' }}>
          <div className="eyebrow">{dict.industries.eyebrow}</div>
          <h2 className="sec-title">{dict.industries.title}</h2>
          <div className="ind-row">
            {dict.industries.items.map((item) => (
              <span className="ind" key={item.label}>
                <i className={`fa-solid ${item.icon} icon-mr`} aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE */}
      <section id="knowledge" className="why">
        <div className="wrap">
          <div className="center" style={{ maxWidth: '660px' }}>
            <div className="eyebrow">{dict.knowledge.eyebrow}</div>
            <h2 className="sec-title">{dict.knowledge.title}</h2>
            <p className="sec-sub center">{dict.knowledge.subtitle}</p>
          </div>
          <div className="blog-grid">
            {dict.knowledge.posts.map((post, index) => (
              <div className="post" key={post.title}>
                <div className="thumb"><i className={`fa-solid ${BLOG_ICONS[index]}`} aria-hidden="true" /></div>
                <div className="body">
                  <span className="tag">{post.tag}</span>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="about">
        <div className="wrap center" style={{ maxWidth: '660px' }}>
          <div className="eyebrow">{dict.testimonial.eyebrow}</div>
          <h2 className="sec-title">{dict.testimonial.title}</h2>
        </div>
        <div className="wrap">
          <div className="quote">
            <div className="mark">&ldquo;</div>
            <p>{dict.testimonial.quote}</p>
            <div className="who">
              {dict.testimonial.who}
              <small>{dict.testimonial.whoDetail}</small>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="partners">
        <div className="wrap center" style={{ maxWidth: '660px' }}>
          <div className="eyebrow">{dict.partners.eyebrow}</div>
          <h2 className="sec-title">{dict.partners.title}</h2>
          <p className="sec-sub center">{dict.partners.subtitle}</p>
        </div>
        <div className="wrap partner-scroll-wrap">
          <div className="partner-grid">
            {PARTNERS.map((partner) => (
              <div className="partner-logo" key={partner.name}>
                <div className="partner-icon" aria-hidden="true">
                  <i className={`fa-solid ${partner.icon}`} />
                </div>
                <span className="partner-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="cta">
        <div className="wrap">
          <div className="form-card">
            <div className="form-left">
              <h3>{dict.contact.title}</h3>
              <p style={{ color: '#e0dcf2' }}>{dict.contact.subtitle}</p>
              <ul>
                {dict.contact.benefits.map((benefit) => (
                  <li key={benefit}>
                    <b><i className="fa-solid fa-check" aria-hidden="true" /></b> {benefit}
                  </li>
                ))}
              </ul>
              <div className="contact-line">
                <i className="fa-solid fa-phone icon-mr" aria-hidden="true" />02-xxx-xxxx &nbsp; · &nbsp;
                <i className="fa-solid fa-envelope icon-mr" aria-hidden="true" />contact@adwaresource.co.th<br />
                <i className="fa-solid fa-location-dot icon-mr" aria-hidden="true" />{dict.contact.maps}
              </div>
              <a href="#contact" className="btn btn-line" style={{ marginTop: '20px' }}>
                <i className="fa-brands fa-line" aria-hidden="true" /> {dict.contact.lineCta}
              </a>
            </div>
            <div className="form-right">
              <form onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className="form-success">
                    <i className="fa-solid fa-circle-check icon-mr" aria-hidden="true" />
                    {dict.contact.form.success}
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="form-error">
                    {errorMessage}
                  </div>
                )}

                <div className="field">
                  <label>{dict.contact.form.fullName}</label>
                  <input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                    placeholder={dict.contact.form.fullNamePlaceholder} 
                  />
                </div>
                <div className="field">
                  <label>{dict.contact.form.contactInfo}</label>
                  <input 
                    value={contactInfo} 
                    onChange={(e) => setContactInfo(e.target.value)} 
                    required 
                    placeholder={dict.contact.form.contactInfoPlaceholder} 
                  />
                </div>
                <div className="field">
                  <label>{dict.contact.form.businessName}</label>
                  <input 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)} 
                    placeholder={dict.contact.form.businessNamePlaceholder} 
                  />
                </div>
                <div className="field">
                  <label>{dict.contact.form.service}</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}>
                    <option value={SERVICE_PLACEHOLDER}>{dict.contact.form.servicePlaceholder}</option>
                    {dict.contact.form.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>{dict.contact.form.details}</label>
                  <textarea 
                    value={details} 
                    onChange={(e) => setDetails(e.target.value)} 
                    rows={3} 
                    placeholder={dict.contact.form.detailsPlaceholder}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`btn btn-purple ${status === 'loading' ? 'btn-disabled' : ''}`}
                  disabled={status === 'loading'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'loading' ? dict.contact.form.submitting : dict.contact.form.submit}
                </button>
                <p className="form-note">{dict.contact.form.note}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="brand" style={{ marginBottom: '14px' }}>
                <img className="logo" src={LOGO_BASE64} alt="Adwaresource" />
                <div className="brandname" style={{ color: '#fff' }}>
                  Adwaresource<small style={{ color: '#9d96c4' }}>ACCOUNTING · AUDIT · TAX</small>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#9d96c4', maxWidth: '280px' }}>
                {dict.footer.tagline}
              </p>
            </div>
            <div>
              <h5>{dict.footer.servicesTitle}</h5>
              {dict.footer.serviceLinks.map((link) => (
                <a href="#services" key={link}>{link}</a>
              ))}
            </div>
            <div>
              <h5>{dict.footer.companyTitle}</h5>
              <a href="#about">{dict.footer.companyLinks.about}</a>
              <a href="#why">{dict.footer.companyLinks.team}</a>
              <a href="#knowledge">{dict.footer.companyLinks.knowledge}</a>
              <a href="#contact">{dict.footer.companyLinks.contact}</a>
            </div>
            <div>
              <h5>{dict.footer.contactTitle}</h5>
              <a href="tel:02-xxx-xxxx"><i className="fa-solid fa-phone icon-mr" aria-hidden="true" />02-xxx-xxxx</a>
              <a href="mailto:contact@adwaresource.co.th"><i className="fa-solid fa-envelope icon-mr" aria-hidden="true" />contact@adwaresource.co.th</a>
              <a href="#contact"><i className="fa-brands fa-line icon-mr" aria-hidden="true" />{dict.footer.lineOa}</a>
              <a href="#contact"><i className="fa-solid fa-location-dot icon-mr" aria-hidden="true" />{dict.footer.maps}</a>
            </div>
          </div>
          <div className="foot-bottom">
            <div>{dict.footer.copyright}</div>
            <div className="foot-bottom-links">
              <a href="/admin" className="footer-portal-btn">
                <i className="fa-solid fa-gauge-high" aria-hidden="true" />
                {dict.footer.portal}
                <i className="fa-solid fa-arrow-up-right-from-square icon-ml" aria-hidden="true" />
              </a>
              <a href="#contact">{dict.footer.privacy}</a>
              <a href="#contact">{dict.footer.cookies}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING LINE BUTTON */}
      <a href="#contact" className="float-line" aria-label={dict.floatLine}>
        <i className="fa-brands fa-line" aria-hidden="true" style={{ fontSize: '28px' }} />
      </a>

      {/* COOKIE CONSENT */}
      {cookieVisible && (
        <div className="cookie" id="cookie">
          <div className="wrap">
            <p>
              <i className="fa-solid fa-cookie-bite icon-mr" aria-hidden="true" />
              {dict.cookie.text}
            </p>
            <div className="acts">
              <button className="btn btn-line2" onClick={acceptCookies}>{dict.cookie.settings}</button>
              <button className="btn btn-purple" onClick={acceptCookies}>{dict.cookie.accept}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
