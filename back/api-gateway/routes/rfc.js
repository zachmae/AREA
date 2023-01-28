/**
 * @brief RFC Controller
 * @description This controller is used to handle RFC errors if needed
 *
 * @author perry.chouteau@epitech.eu
 */

const rfcContinue =
    `<h1>Welcome to the API Gateway (100)</h1>
    <p>The 100 (Continue) status code indicates that
    the initial part of a request has been received
    and has not yet been rejected by the server.
    The server intends to send a final response after
    the request has been fully received and acted upon.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcSwitchingProtocols =
    `<h1>Welcome to the API Gateway (101)</h1>
    <p>The 101 (Switching Protocols) status code indicates
    that the server understands and is willing to comply
    with the client's request, via the Upgrade message
    header field (Section 6.7 of [RFC7230]), for a change
    in the application protocol being used on this connection.
    The server will switch protocols to those defined by the
    response's Upgrade header field immediately after the
    empty line which terminates the 101 response.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcOk =
    `<h1>Welcome to the API Gateway (200)</h1>
    <p>The 200 (OK) status code indicates that the request
    has succeeded. The meaning of a success varies depending
    on the HTTP method:</p>
    <ul>
        <li>GET: The resource has been fetched and is transmitted in the message body.</li>
        <li>HEAD: The entity headers are in the message body.</li>
        <li>PUT or POST: The resource describing the result of the action is transmitted in the message body.</li>
        <li>OPTIONS: The message body contains the allowed methods.</li>
        <li>TRACE: The message body contains the request message as received by the end server.</li>
    </ul>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcCreated =
    `<h1>Welcome to the API Gateway (201)</h1>
    <p>The 201 (Created) status code indicates that the request
    has succeeded and has led to the creation of a resource.
    The new resource is effectively created before this response
    is sent back and the new resource is returned in the body of
    the message, its location being either the URL of the request,
    or the content of the Location header. The common use case
    for this status code is as the result of a POST request.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcAccepted =
    `<h1>Welcome to the API Gateway (202)</h1>
    <p>The 202 (Accepted) status code indicates that the request
    has been received but not yet acted upon. It is non-committal,
    meaning that there is no way in HTTP to later send an asynchronous
    response indicating the outcome of the request. It is intended
    for cases where another process or server handles the request,
    or for batch processing.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNonAuthoritativeInformation =
    `<h1>Welcome to the API Gateway (203)</h1>
    <p>The 203 (Non-Authoritative Information) status code indicates
    that the request was successful but the enclosed payload has been
    modified from that of the origin server's 200 (OK) response by a
    transforming proxy.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNoContent =
    `<h1>Welcome to the API Gateway (204)</h1>
    <p>The 204 (No Content) status code indicates that the server
    has successfully fulfilled the request and that there is no
    additional content to send in the response payload body. Metadata
    in the response header fields refer to the target resource and
    its selected representation after the requested action was applied.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcResetContent =
    `<h1>Welcome to the API Gateway (205)</h1>
    <p>The 205 (Reset Content) status code indicates that the server
    has fulfilled the request and desires that the user agent reset
    the "document view", which caused the request to be sent, to its
    original state as received from the origin server.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcPartialContent =
    `<h1>Welcome to the API Gateway (206)</h1>
    <p>The 206 (Partial Content) status code indicates that the server
    has fulfilled the partial GET request for the resource. The request
    must have included a Range header field (section 14.35) indicating
    the desired range, and may have included an If-Range header field
    (section 14.27) to make the request conditional.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcMultipleChoices =
    `<h1>Welcome to the API Gateway (300)</h1>
    <p>The 300 (Multiple Choices) status code indicates that the
    target resource has more than one representation, each with
    its own more specific identifier, and information about the
    alternatives is being provided so that the user (or user agent)
    can select a preferred representation by redirecting its request
    to one or more of those identifiers.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcMovedPermanently =
    `<h1>Welcome to the API Gateway (301)</h1>
    <p>The 301 (Moved Permanently) status code indicates that the
    target resource has been assigned a new permanent URI and any
    future references to this resource ought to use one of the
    enclosed URIs. Clients with link editing capabilities ought to
    automatically re-link references to the effective request URI
    to one or more of the new references sent by the server, where
    possible. This response is cacheable unless indicated otherwise.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcFound =
    `<h1>Welcome to the API Gateway (302)</h1>
    <p>The 302 (Found) status code indicates that the target resource
    resides temporarily under a different URI. Since the redirection
    might be altered on occasion, the client ought to continue to use
    the effective request URI for future requests. This response is
    only cacheable if indicated by a Cache-Control or Expires header
    field.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcSeeOther =
    `<h1>Welcome to the API Gateway (303)</h1>
    <p>The 303 (See Other) status code indicates that the server is
    redirecting the user agent to a different resource, as indicated
    by a URI in the Location header field, which is intended to provide
    an indirect response to the original request. A user agent can
    perform a retrieval request targeting that URI (a GET or HEAD
    request if using HTTP) <strong>without</strong> modifying the
    original request method or body by automatically redirecting the
    request.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNotModified =
    `<h1>Welcome to the API Gateway (304)</h1>
    <p>The 304 (Not Modified) status code indicates that a conditional
    GET or HEAD request has been received and would have resulted in a
    200 (OK) response if it were not for the fact that the condition
    evaluated to false.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcUseProxy =
    `<h1>Welcome to the API Gateway (305)</h1>
    <p>The 305 (Use Proxy) status code is no longer used; it is
    just reserved. The 306 status code was used in a previous
    version of the specification, is no longer used, and the code
    is reserved.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcTemporaryRedirect =
    `<h1>Welcome to the API Gateway (307)</h1>
    <p>The 307 (Temporary Redirect) status code indicates that the
    target resource resides temporarily under a different URI and
    the user agent MUST NOT change the request method if it performs
    an automatic redirection to that URI. Since the redirection
    can change over time, the client ought to continue using the
    effective request URI for future requests. This response is
    only cacheable if indicated by a Cache-Control or Expires header
    field.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcPermanentRedirect =
    `<h1>Welcome to the API Gateway (308)</h1>
    <p>The 308 (Permanent Redirect) status code indicates that the
    target resource has been assigned a new permanent URI and any
    future references to this resource ought to use one of the
    enclosed URIs. Clients with link editing capabilities ought to
    automatically re-link references to the effective request URI
    to one or more of the new references sent by the server, where
    possible. This response is cacheable unless indicated otherwise.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcBadRequest =
    `<h1>Welcome to the API Gateway (400)</h1>
    <p>The 400 (Bad Request) status code indicates that the server
    cannot or will not process the request due to something that is
    perceived to be a client error (e.g., malformed request syntax,
    invalid request message framing, or deceptive request routing).</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcUnauthorized =
    `<h1>Welcome to the API Gateway (401)</h1>
    <p>The 401 (Unauthorized) status code indicates that the request
    has not been applied because it lacks valid authentication
    credentials for the target resource. The server generating a
    401 response MUST send a WWW-Authenticate header field
    containing at least one challenge applicable to the target
    resource. If the request included authentication credentials,
    then the 401 response indicates that authorization has been
    refused for those credentials. The user agent MAY repeat the
    request with a new or replaced Authorization header field
    (Section 4.2 of [RFC7235]). If the 401 response contains the
    same challenge as the prior response, and the user agent has
    already attempted authentication at least once, then the user
    agent SHOULD present the enclosed representation to the user,
    since it usually contains relevant diagnostic information.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcPaymentRequired =
    `<h1>Welcome to the API Gateway (402)</h1>
    <p>The 402 (Payment Required) status code is reserved for future
    use. The original intention was that this code might be used as
    part of some form of digital cash or micropayment scheme, as
    proposed, for example, by GNU Taler, but that has not yet happened,
    and this code is not usually used. Google Developers API uses this
    status if a particular developer has exceeded the daily limit on
    requests. Sipgate uses this code if an account does not have
    sufficient funds to start a call. Shopify uses this code when the
    store has not paid their fees and is temporarily disabled. Stripe
    uses this code for failed payments where parameters were correct,
    for example blocked fraudulent payments.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcForbidden =
    `<h1>Welcome to the API Gateway (403)</h1>
    <p>The 403 (Forbidden) status code indicates that the server
    understood the request but refuses to authorize it. A server
    that wishes to make public why the request has been forbidden
    can describe that reason in the response payload (if any).</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNotFound =
    `<h1>Welcome to the API Gateway (404)</h1>
    <p>The 404 (Not Found) status code indicates that
    the origin server did not find a current
    representation for the target resource or is
    not willing to disclose that one exists.
    A 404 status code does not indicate whether
    this lack of representation is temporary or
    permanent; the 410 (Gone) status code is
    preferred over 404 if the origin server knows,
    presumably through some configurable means,
    that the condition is likely to be permanent.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:8080">
            http://localhost:8080
        </a>
    </p>`

const rfcMethodNotAllowed =
    `<h1>Welcome to the API Gateway (405)</h1>
    <p>The 405 (Method Not Allowed) status code indicates that
    the method received in the request-line is known by the
    origin server but not supported by the target resource.
    The origin server MUST generate an Allow header field in a
    405 response containing a list of the target resource's
    currently supported methods.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNotAcceptable =
    `<h1>Welcome to the API Gateway (406)</h1>
    <p>The 406 (Not Acceptable) status code indicates that the
    target resource does not have a current representation that
    would be acceptable to the user agent, according to the
    proactive negotiation header fields received in the request,
    and the server is unwilling to supply a default representation.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcProxyAuthenticationRequired =
    `<h1>Welcome to the API Gateway (407)</h1>
    <p>The 407 (Proxy Authentication Required) status code is
    similar to 401 (Unauthorized), but indicates that the client
    needs to authenticate itself in order to use a proxy.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcRequestTimeout =
    `<h1>Welcome to the API Gateway (408)</h1>
    <p>The 408 (Request Timeout) status code indicates that the
    server did not receive a complete request message within the
    time that it was prepared to wait. A server SHOULD send the
    "close" connection option in the response, since 408 implies
    that the server has decided to close the connection rather
    than continue waiting. If the client has an outstanding
    request in transit, the client MAY repeat that request on a
    new connection. However, proxies MUST forward 408 responses
    in accordance with [RFC7231], Section 6.4.7.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcConflict =
    `<h1>Welcome to the API Gateway (409)</h1>
    <p>The 409 (Conflict) status code indicates that the request
    could not be completed due to a conflict with the current
    state of the target resource. This code is used in situations
    where the user might be able to resolve the conflict and resubmit
    the request. The server SHOULD generate a payload that includes
    enough information for a user to recognize the source of the
    conflict. Ideally, the response entity would include enough
    information for the user or user agent to fix the problem; however,
    that might not be possible and is not required.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcGone =
    `<h1>Welcome to the API Gateway (410)</h1>
    <p>The 410 (Gone) status code indicates that access to the
    target resource is no longer available at the origin server
    and that this condition is likely to be permanent. If the
    origin server does not know, or has no facility to determine,
    whether or not the condition is permanent, the status code 404
    (Not Found) ought to be used instead. This status code is
    commonly used when the server does not wish to reveal exactly
    why the request has been refused, or when no other response
    is applicable.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcLengthRequired =
    `<h1>Welcome to the API Gateway (411)</h1>
    <p>The 411 (Length Required) status code indicates that the
    server refuses to accept the request without a defined
    Content-Length. The client MAY repeat the request if it adds
    a valid Content-Length header field containing the length of
    the message body in the request message.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcPreconditionFailed =
    `<h1>Welcome to the API Gateway (412)</h1>
    <p>The 412 (Precondition Failed) status code indicates that
    one or more conditions given in the request header fields
    evaluated to false when tested on the server. This response
    code allows the client to place preconditions on the current
    resource state (its current representations and metadata)
    and, thus, prevent the request method from being applied if
    the target resource is in an unexpected state.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcContentTooLarge =
    `<h1>Welcome to the API Gateway (413)</h1>
    <p>The 413 (Payload Too Large) status code indicates that
    the server is refusing to process a request because the
    request payload is larger than the server is willing or
    able to process. The server MAY close the connection to
    prevent the client from continuing the request.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcURITooLong =
    `<h1>Welcome to the API Gateway (414)</h1>
    <p>The 414 (URI Too Long) status code indicates that the
    server is refusing to service the request because the
    request-target is longer than the server is willing to
    interpret. This rare condition is only likely to occur when
    a client has improperly converted a POST request to a GET
    request with long query information, when the client has
    descended into a URI "black hole" of redirection (e.g., a
    redirected URI prefix that points to a suffix of itself),
    or when the server is under attack by a client attempting
    to exploit potential security holes present in some servers
    using fixed-length buffers for reading or manipulating the
    request-line.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcUnsupportedMediaType =
    `<h1>Welcome to the API Gateway (415)</h1>
    <p>The 415 (Unsupported Media Type) status code indicates
    that the origin server is refusing to service the request
    because the payload is in a format not supported by this
    method on the target resource. The format problem might be
    due to the request's indicated Content-Type or Content-Encoding,
    or as a result of inspecting the data directly.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcRangeNotSatisfiable =
    `<h1>Welcome to the API Gateway (416)</h1>
    <p>The 416 (Range Not Satisfiable) status code indicates
    that none of the ranges in the request's Range header field
    (Section 14.35) overlap the current extent of the selected
    resource or that the set of ranges requested has been
    rejected due to invalid ranges or an excessive request of
    small or overlapping ranges.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcExpectationFailed =
    `<h1>Welcome to the API Gateway (417)</h1>
    <p>The 417 (Expectation Failed) status code indicates that
    the expectation given in the request's Expect header field
    (Section 14.20) could not be met by at least one of the
    inbound servers.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcMisdirectedRequest =
    `<h1>Welcome to the API Gateway (421)</h1>
    <p>The 421 (Misdirected Request) status code indicates that
    the request was directed at a server that is not able to
    produce a response (for example because of connection reuse).</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcUnprocessableContent =
    `<h1>Welcome to the API Gateway (422)</h1>
    <p>The 422 (Unprocessable Entity) status code means the
    server understands the content type of the request entity
    (hence a 415(Unsupported Media Type) status code is inappropriate),
    and the syntax of the request entity is correct (thus a 400
    (Bad Request) status code is inappropriate) but was unable
    to process the contained instructions. For example, this
    error condition may occur if an XML request body contains
    well-formed (i.e., syntactically correct), but semantically
    erroneous, XML instructions.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`


const rfcUpgradeRequired =
    `<h1>Welcome to the API Gateway (426)</h1>
    <p>The 426 (Upgrade Required) status code indicates that the
    server refuses to perform the request using the current
    protocol but might be willing to do so after the client
    upgrades to a different protocol. The server MUST send an
    Upgrade header field in a 426 response to indicate the required
    protocol(s).</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcNotImplemented =
    `<h1>Welcome to the API Gateway (501)</h1>
    <p>The 501 (Not Implemented) status code indicates that the
    server does not support the functionality required to fulfill
    the request. This is the appropriate response when the server
    does not recognize the request method and is not capable of
    supporting it for any resource.</p>
    <p>You seems lost, you should try with this:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcBadGateway =
    `<h1>Welcome to the API Gateway (502)</h1>
    <p>status code indicates that the server,
    while acting as a gateway or proxy,
    received an invalid response from an
    inbound server it accessed while
    attempting to fulfill the request.</p>
    <p>you should try later when the service will be up:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcServiceUnavailable =
    `<h1>Welcome to the API Gateway (503)</h1>
    <p>The 503 (Service Unavailable) status code
    indicates that the server is currently unable
    to handle the request due to a temporary overload
    or scheduled maintenance, which will likely be
    alleviated after some delay. The server MAY send
    a Retry-After header field (Section 10.2.3) to
    suggest an appropriate amount of time for the
    client to wait before retrying the request.</p>
    <p>you should try later when the service will be up:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcGatewayTimeout =
    `<h1>Welcome to the API Gateway (504)</h1>
    <p>The 504 (Gateway Timeout) status code indicates
    that the server, while acting as a gateway or proxy,
    did not receive a timely response from an upstream
    server it needed to access in order to complete the
    request.</p>
    <p>you should try later when the service will be up:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

const rfcHttpVersionNotSupported =
    `<h1>Welcome to the API Gateway (505)</h1>
    <p>The 505 (HTTP Version Not Supported) status code
    indicates that the server does not support, or refuses
    to support, the major version of HTTP that was used in
    the request message. The server is indicating that it
    is unable or unwilling to complete the request using
    the same major version as the client, as described in
    Section 3.1, other than with this error message. The
    response SHOULD contain an entity describing why that
    version is not supported and what other protocols are
    supported by that server.</p>
    <p>you should try later when the service will be up:
        <a href="http://localhost:7357">
            http://localhost:7357
        </a>
    </p>`

module.exports = {
    rfcBadRequest,
    rfcUnauthorized,
    rfcPaymentRequired,
    rfcForbidden,
    rfcNotFound,
    rfcMethodNotAllowed,
    rfcNotAcceptable,
    rfcProxyAuthenticationRequired,
    rfcRequestTimeout,
    rfcConflict,
    rfcGone,
    rfcLengthRequired,
    rfcPreconditionFailed,
    rfcContentTooLarge,
    rfcURITooLong,
    rfcUnsupportedMediaType,
    rfcRangeNotSatisfiable,
    rfcExpectationFailed,
    rfcMisdirectedRequest,
    rfcUnprocessableContent,
    rfcUpgradeRequired,
    rfcNotImplemented,
    rfcBadGateway,
    rfcServiceUnavailable,
    rfcGatewayTimeout,
    rfcHttpVersionNotSupported
}
